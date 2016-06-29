'use strict';

// Production specific configuration
// =================================

var dbConfig = require('../../../../../config/databases/datasources.json').mailmerge;

module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  // Bookshelf connection options
  bookshelf: {
    filename: dbConfig.storage
  }
};
