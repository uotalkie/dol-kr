@echo off
SET "PATH=%CD%\androidsdk\commandline-tools\latest\bin;%CD%\androidsdk\gradle\bin;%PATH%"
SET "ANDROID_HOME=%CD%\androidsdk"
SET "ANDROID_SDK_ROOT=%ANDROID_HOME%"

IF NOT EXIST "..\..\Degrees of Lewdity.html" (
	IF EXIST "..\..\Degrees of Lewdity VERSION.html" (
		copy "..\..\Degrees of Lewdity VERSION.html" "..\..\Degrees of Lewdity.html"
	) ELSE (
		echo game is not compiled. make sure to run compile.bat first
		pause
		exit
	)
)

@echo on
call node scripts/build_app.js

pause
