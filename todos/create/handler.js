const lib = require('../lib/todos');

module.exports.handler = function handler(event, context) {
  lib.create(event, context.done);
};
