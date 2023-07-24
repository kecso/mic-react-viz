'use strict';

var config = require('./config.default'),
    validateConfig = require('webgme/config/validator');

// Add/overwrite any additional settings here
config.mongo.uri = 'mongodb://mongo:27017/mrv-ds';

validateConfig(config);
module.exports = config;
