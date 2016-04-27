'use strict';

// Require Logic
var lib = require('../lib/todos');

// Lambda Handler
module.exports.handler = function(event, context) {

  lib.remove(event, function(error, response) {
    return context.done(error, response);
  });
};
