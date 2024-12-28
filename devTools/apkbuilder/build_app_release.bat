@echo off
SET "PATH=%CD%\androidsdk\commandline-tools\latest\bin;%CD%\androidsdk\gradle\bin;%PATH%"
SET "ANDROID_HOME=%CD%\androidsdk"
SET "ANDROID_SDK_ROOT=%ANDROID_HOME%"

IF NOT EXIST "..\..\Degrees of Lewdity.html" (
REM windows' compile.bat is dumb about versions
	IF EXIST "..\..\Degrees of Lewdity VERSION.html" (
		copy "..\..\Degrees of Lewdity VERSION.html" "..\..\Degrees of Lewdity.html"
	) ELSE (
		echo game is not compiled. make sure to run compile.bat first
		pause
		exit
	)
)

REM uncomment the line below (remove "REM") to skip prompt for password when it's set correctly
REM SET SKIP_PASSWORD=true

SET BUILD_RELEASE=true
@echo on
call node scripts/build_app.js

pause
