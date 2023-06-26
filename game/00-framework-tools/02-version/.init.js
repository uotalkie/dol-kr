Versions.registry = [];
Versions.log = [];
Versions.recordStep = step => {
	Versions.log.push(step);
};
// this will be updated automatically
Versions.latest = 0;
Versions.register = (versionId, migration) => {
	console.log(`Registering version schema`, typeof versionId, versionId, migration);
	if (versionId !== Versions.registry.length + 1) {
		// If we get all versions in order, we don't have to try to verify them after the fact.
		Errors.report(
			`Invalid migration registration. Next expected version id was ${Versions.registry.length + 1},
			but got ${versionId} instead. Version migrations might not work as expected`
		);
	}
	Versions.registry[versionId - 1] = {
		migration,
		versionId,
	};
	Versions.latest = Math.max(Versions.latest, versionId);
};
Versions.migrate = (originalVersion, state) => {
	Versions.log = [];
	let currentVersion = originalVersion;
	let migrationFailed = false;
	let nextMigration = Versions.registry[currentVersion];
	while (nextMigration && !migrationFailed) {
		migrationFailed = nextMigration.migration(originalVersion, state);
		currentVersion = nextMigration.versionId;
		nextMigration = Versions.registry[currentVersion];
	}
	if (migrationFailed) {
		Errors.report(`One or more errors occurred while attempting to migrate from schema version ${originalVersion} to the latest`, Versions.log);
	}
	if (currentVersion !== Versions.latest && !migrationFailed) {
		Errors.report(`Migration steps missing for schema version: ${originalVersion}`, Versions.log);
	}
	return currentVersion;
};
/**
 * Utility for migrations to use. Make more robust migrations + provides logging in case of later errors.
 *
 * Usage:
 * Versions.stepper(originalVersion, <youridhere>)
 *  .step(() => ...)
 *	  // option; critical = true;
 *	  // if it fails nothing else will execute and the migration will be marked as a failure
 *  .step(() => ..., { critical: true })
 *	  // option; name = <string>
 *	  // provides a human readable name for the purpose of logging and error reporting
 *  .step(() => ..., { name: 'my specific step' })
 *	  // option; requires = <function>
 *	  // ensures that the step did what was intended to be done.
 *	  // this is useful in that if the update step fails, but we're already in a good state
 *	  // then we know we can (probably) continue successfully, despite the earlier failure
 *  .step(() => ..., { requires: () => ... }).
 *
 * Note, by convention, a single stepper should be used.
 */
Versions.Stepper = class Stepper {
	constructor(originalVersion, currentStage) {
		this.originalVersion = originalVersion;
		this.currentStage = currentStage;
		this.nextStepIdNumber = 0;
		this.shouldContinue = true;
	}

	step(statement, { critical, requires, name } = {}) {
		const errors = [];
		let requirementsComplete = !requires;
		if (this.shouldContinue) {
			if (name === undefined) {
				name = statement.toString();
			}
			const stepId = `${this.currentStage}-${this.nextStepIdNumber++}`;
			try {
				statement();
			} catch (e) {
				errors.push(e);
			} finally {
				try {
					requirementsComplete = requires();
				} catch (e) {
					errors.push(e);
				}
			}
			Versions.recordStep({
				stepId,
				originalVersion: this.originalVersion,
				currentStage: this.currentStage,
				name,
				errors,
			});
			this.shouldContinue = requirementsComplete && !(errors.length > 0 && critical);
		}
		return this;
	}
};

Versions.stepper = (originalVersion, currentStage) => {
	return new Versions.Stepper(originalVersion, currentStage);
};

$(document).on(":archiverevive", function (e) {
	const state = e.archive.state;
	const version = state.variables.version;

	if (!version || version.schema === undefined) {
		// The sugarcube baseline version has yet to be applied. Move to a special passage to apply it. The user will be able to resume afterwords.
		if (state.title !== "Upgrade Waiting Room" && state.title !== "Start") {
			console.log(`Schema version number not found. Banishing the player to the waiting room.`);
			state.variables.navigation = state.variables.navigation || {};
			state.variables.navigation.stack = state.variables.navigation.stack || [];
			state.variables.navigation.stack.push(state.title);
			state.title = "Upgrade Waiting Room";
		}
	} else if (version.schema !== Versions.latest) {
		console.log(`Migrating game state from ${schemaVersion} to ${Versions.latest}`);
		state.variables.schemaVersion = Versions.migrate(schemaVersion === undefined ? 0 : schemaVersion, state);
		// modified history, be sure to notify the framework by returning the history object
		// TODO: apply class transformations to objects in state *after* migrations are complete
	}
});
