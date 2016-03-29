'use strict';

// Require Logic
var lib = require('../lib/todos');

// Lambda Handler
module.exports.handler = function(event, context) {

  lib.list(event, function(error, response) {
    console.log(process.env);
    return context.done(error, response);
  });
};