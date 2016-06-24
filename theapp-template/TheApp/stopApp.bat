:: Name:     stopApp.bat
:: Purpose:  Script to stop the application on Windows
:: Author:   Luis Manuel <luisman40@gmail.com>
:: Revision: June 2016 - initial version

@ECHO OFF
SETLOCAL ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION

:: variables
SET rootdir=%~dp0
:: Library to parse JSON
SET jq=%rootdir%_internal\tools\jq\jq
:: NodeJS
SET node=%rootdir%_internal\runtime\nodejs\node
:: Redis executable directory
SET redispath=%rootdir%_internal\tools\redis2.8.2402-xp32bit\

:: Uninstall and stop Redis Service
%redispath%redis-server --service-stop --service-name redisService
%redispath%redis-server --service-uninstall --service-name redisService

PAUSE
ECHO ON

