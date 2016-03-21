/**
 * Lib
 */

module.exports.list = function(event, cb) {

  var response = {
    function: 'list',
    event: event
  };

  return cb(null, response);
};

module.exports.show = function(event, cb) {

  var response = {
    function: 'show',
    event: event
  };

  return cb(null, response);
};

module.exports.create = function(event, cb) {

  var response = {
    function: 'create',
    event: event
  };

  return cb(null, response);
};

module.exports.update = function(event, cb) {

  var response = {
    function: 'update',
    event: event
  };

  return cb(null, response);
};
