vogels = require('vogels');
joi = require('joi');
_ = require('lodash');

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
    title: joi.string().required(),
    done: joi.bool().default(false)
  }
});

module.exports.list = function(params, cb) {
  Todo.scan().loadAll().exec(function(err, res) {
    var items = res ? res.Items : [];
    return cb(err, items)
  })
};

module.exports.show = function(params, cb) {
  Todo.get(params.pathId, function(err, item) {
    return cb(err, item);
  });
};

module.exports.create = function(params, cb) {
  Todo.create(params.body, function(err, item) {
    return cb(err, item)
  });
};

module.exports.update = function(params, cb) {
  Todo.get(params.pathId, function(err, item) {
    if (err) {
      return cb(err, item);
    }
    if (!item) {
      return cb('No matching todo found');
    }

    var update = item.get();
    _.assign(update, _.pick(params.body, ['title', 'done']));
    Todo.update(update, function(err, res) {
      return cb(err, res);
    });
  });
};

module.exports.remove = function(params, cb) {
  Todo.destroy(params.pathId, function(err) {
    if (err) {
      return cb(err);
    }
    return cb(null, {});
  });
}