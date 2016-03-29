'use strict';

// Require Logic
var lib = require('../lib/todos');

// Lambda Handler
module.exports.handler = function(event, context) {

  lib.show(event, function(error, response) {
    return context.done(error, response);
  });
};
