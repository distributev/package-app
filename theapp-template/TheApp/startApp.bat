:: Name:     startApp.bat
:: Purpose:  Script to start the application on Windows
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
:: Config files
SET redisconfig=%rootdir%config\databases\redis.json

:: Set redis config variables (redisport, redishost, redisauth)
<%redisconfig% %jq% -r ".redis|to_entries|.[]|\"SET redis\(.key)=\(.value)\"" > %rootdir%setvars.bat
CALL %rootdir%setvars.bat
del %rootdir%setvars.bat

:: Install and start Redis Service on config port
%redispath%redis-server --service-install %redispath%redis.windows-service.conf --service-name redisService --port %redisport% --loglevel verbose
%redispath%redis-server --service-start %redispath%redis.windows.conf --service-name redisService --loglevel verbose

PAUSE
ECHO ON


