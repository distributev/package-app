/**
 * Start Redis Server
 */

'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var redisConfig = require('../../../config/databases/redis.json').redis;
var redisPath = path.join(__dirname,'..','..','tools','redis2.8.2400-xp32bit');

export default function(app) {

  var redis = spawn(path.join(redisPath, 'redis-server'), [
    path.join(redisPath, 'redis.windows.conf'),
    '--port',
    redisConfig.port || 4321
  ]);

  redis.on('exit', function (code) {
    console.log('Redis server terminated with exit code: ' + code);
  });
}
