/**
* build wrapper
*/
(async () => {
	const cordova = require('cordova');
	const read = require('read');
	const fs = require('fs-extra');
	const path = require('path');
	const xml = require('cordova-common').xmlHelpers;

	// assume we're in gameRoot/devTools/apkbuilder
	const gameRoot = path.resolve("../..");

	const release = process.env.BUILD_RELEASE;
	// read version info from gameRoot/game/01-config/sugarcubeConfig.js
	const versionData = fs.readFileSync(path.resolve(gameRoot, "game/01-config/sugarcubeConfig.js")).toString();
	// extract 0.X.Y.Z from 'version: "0.X.Y.Z",'
	const version = versionData.match(/(?<=version: ")\d.\d*.\d*.\d*/)[0];
	// adjust config.xml
	const configFile = path.resolve("config.xml");
	const configData = xml.parseElementtreeSync(configFile);
	// update version
	configData.getroot().attrib.version = version;
	// update package name for debug and release builds
	let targetName = configData.getroot().attrib['android-packageName'];
	if (release && targetName.endsWith("_debug")) targetName = targetName.slice(0, -6);
	else if (!release && !targetName.endsWith("_debug")) targetName += "_debug";
	configData.getroot().attrib['android-packageName'] = targetName;
	fs.writeFileSync(configFile, configData.write({indent: 4}), "utf-8");
	// update android manifest
	const manifestFile = path.resolve('platforms/android/app/src/main/AndroidManifest.xml');
	if (fs.existsSync(manifestFile)) {
		const manifestData = xml.parseElementtreeSync(manifestFile);
		if (manifestData.getroot().attrib.package !== targetName) {
			const prevName = manifestData.getroot().attrib.package;
			// update targetName
			manifestData.getroot().attrib.package = targetName;
			fs.writeFileSync(manifestFile, manifestData.write({ indent: 4 }), 'utf-8');
			// update project paths
			const javaDir = "platforms/android/app/src/main/java/";
			const prevDir = path.resolve(javaDir, prevName.split(".").join("/"));
			const targetDir = path.resolve(javaDir, targetName.split(".").join("/"))
			fs.moveSync(prevDir, targetDir);
			const mainActivity = path.resolve(targetDir, "MainActivity.java");
			fs.writeFileSync(mainActivity, fs.readFileSync(mainActivity).toString().replace(prevName, targetName));
		}
	}


	if (release) {
		const keystore = path.resolve(gameRoot, 'keys/dol.keystore');
		if (release && !fs.existsSync(keystore)) {
			throw new Error(
				`Release build requires a valid keystore @${keystore}.
				If you don't have one, it is recommended to use debug build instead.`)
		}

		const buildFile = path.resolve('build.json');
		const buildFileExists = fs.existsSync(buildFile);
		let password = ""
		try {
			if (buildFileExists && process.env.SKIP_PASSWORD); // skip the prompt
			else password = await read({
				prompt: 'Please enter the password' + (buildFileExists ? ' (or press enter to re-use last provided): ' : ': '),
				silent: true,
				replace: '*',
				timeout: 15000,
			})
		} catch (ex) {
			if (ex.message !== "timed out" || !buildFileExists) return console.log("\n " + ex.message);
		}

		if (password) {
			const build_opts = {
				android: {
					release: {
						keystore: keystore,
						storePassword: password,
						password: password,
						alias: "dol",
						keystoreType: "pkcs12",
						packageType: "apk",
					}
				}
			}
			fs.writeFileSync(buildFile, JSON.stringify(build_opts, null, "\t"));
		}
		else if(buildFileExists) console.log(" re-using old password ");
		else return console.log(" no password provided, exiting ")
	}

	cordova.build({options: {release}});
})()
