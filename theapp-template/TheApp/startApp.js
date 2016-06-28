/**
 * Script to start the application on Windows
 */

'use strict';

const forever = require('forever-monitor');
const fs = require('fs');
const spawn = require('child_process').spawn;

console.log('Starting...');

// Start Redis server
const redisConfig = require('./config/databases/redis.json').redis;
const redisPath = '_internal\\tools\\redis2.8.2400-xp32bit\\';
const redis = spawn(redisPath + 'redis-server', [
  redisPath + 'redis.windows.conf',
  '--port',
  redisConfig.port || 4321
]);

redis.on('exit', (code) => {
  console.log('Redis server terminated with exit code: ' + code);
});

// Start server/app.js
const theApp = spawn('_internal\\runtime\\nodejs\\nodejs', [
  '_internal\\app\\server\\app.js',
]);
setTimeout(() => {
  // Write the server/app.js pid to a file
  fs.writeFile('app.pid', theApp.pid, (err) => {
    if (err) throw err;
    console.log('Started server/app.js with pid ' + theApp.pid + '...');
  });
}, 1000);

theApp.on('exit', (code) => {
  // Cleanup
  redis.kill(); // Kills the Redis server
  console.log('server/app.js has exited with code: ' + code);
});

process.on('exit', function() {
  theApp.kill();
});

var cleanExit = function() { process.exit() };

process.on('WM_CLOSE', cleanExit); // catch closing the cmd.exe prompt
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill

