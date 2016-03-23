vogels = require('vogels');
joi = require('joi');

vogels.AWS.config.update({ region: process.env.AWS_REGION });

if (process.env.DYNAMODB_ENDPOINT) {
  vogels.AWS.config.dynamodb = { endpoint: process.env.DYNAMODB_ENDPOINT };
}

var Todo = vogels.define('Todo', {
  hashKey: 'id',
  timestamps: true,
  tableName: process.env.DYNAMODB_TODO_TABLE,
  schema: {
    id: vogels.types.uuid(),
    title: joi.string(),
    done: joi.bool()
  }
});

module.exports.list = function(params, cb) {
  Todo.scan().loadAll().exec(function(err, res) {
    var items = res ? res.Items : null;
    cb(err, items)
  })
};

module.exports.show = function(params, cb) {
  Todo.get(params.pathId, function(err, item) {
    cb(err, item);
  });
};

module.exports.create = function(params, cb) {
  Todo.create(params, function(err, item) {
    cb(err, item)
  });
};

module.exports.update = function(params, cb) {
  params.id = params.pathId;
  delete params.pathId;

  Todo.update(params, function(err, item) {
    cb(err, item);
  });
};
