:: Name:     stopApp.bat
:: Purpose:  Script to stop the application on Windows
:: Author:   Luis Manuel <luisman40@gmail.com>
:: Revision: June 2016 - initial version

@ECHO OFF
SETLOCAL ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION

:: Get pid of startApp node process for graceful termination
FOR /F "tokens=*" %%i IN (app.pid) DO @SET pid=%%i
TASKKILL /F /PID %pid%

:: PAUSE
ECHO ON

