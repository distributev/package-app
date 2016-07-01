/**
 * Start Redis Server
 */

'use strict';

var path = require('path');
var spawn = require('child_process').spawn;
var os = require('os');
var fs = require('fs');
var redisPath = path.join(__dirname,'..','..','tools','redis2.8.2400-xp32bit');

export default function(app) {
  var env = app.get('env');
  // Check if os is windows, and that env is production before proceding
  if (os.platform() === 'win32' && env === 'production') {
    // Get the redis config
    var redisConfig = require('../../../config/databases/redis.json');
    // Check if redisConfig file exists
    fs.access(redisConfig, fs.F_OK, (err) => {
      if (!err) {
        // Check if the bundled redis should be started
        if (redisConfig.redis && redisConfig.redis.host !== 'bundled') {
          // Start the redis server
          var redis = spawn(path.join(redisPath, 'redis-server'), [
            path.join(redisPath, 'redis.windows.conf'),
            '--port',
            redisConfig.redis.port || 4321
          ]);

          redis.on('exit', (code) => {
            console.log('Redis server terminated with exit code: ' + code);
          });
        }
      }
    });
  }
}
