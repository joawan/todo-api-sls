const vogels = require('vogels');
const joi = require('joi');
const _ = require('lodash');

vogels.AWS.config.update({ region: process.env.AWS_REGION });

if (process.env.DYNAMODB_ENDPOINT) {
  vogels.AWS.config.dynamodb = { endpoint: process.env.DYNAMODB_ENDPOINT };
}

const Todo = vogels.define('Todo', {
  hashKey: 'id',
  timestamps: true,
  tableName: process.env.DYNAMODB_TODO_TABLE,
  schema: {
    id: vogels.types.uuid(),
    title: joi.string().required(),
    done: joi.bool().default(false),
  },
});

module.exports.list = function list(params, cb) {
  Todo.scan().loadAll().exec(function listCallback(err, res) {
    if (err) { return cb('500: DB Error'); }
    const items = res ? res.Items : [];
    return cb(err, items);
  });
};

module.exports.show = function show(params, cb) {
  Todo.get(params.pathId, function showCallback(err, item) {
    if (err) { return cb('500: DB Error'); }
    if (!item) { return cb('404: Item not found'); }
    return cb(err, item);
  });
};

module.exports.create = function create(params, cb) {
  const data = params.body || params;
  Todo.create(data, function createCallback(err, item) {
    if (err) { return cb('400: {e}'.replace('{e}', err)); }
    return cb(err, item);
  });
};

module.exports.update = function update(params, cb) {
  Todo.get(params.pathId, function getCallback(getErr, item) {
    if (getErr) { return cb('500: DB Error'); }
    if (!item) { return cb('404: Item not found'); }

    const data = item.get();
    const body = params.body || params;
    _.assign(data, _.pick(body, ['title', 'done']));
    return Todo.update(data, function updateCallback(updateErr, updatedItem) {
      if (updateErr) { return cb('500: DB Error'); }
      return cb(updateErr, updatedItem);
    });
  });
};

module.exports.remove = function remove(params, cb) {
  Todo.get(params.pathId, function getCallback(getErr, item) {
    if (getErr) { return cb('500: DB Error'); }
    if (!item) { return cb('404: Item not found'); }

    return Todo.destroy(params.pathId, function destroyCallback(destroyErr) {
      if (destroyErr) { return cb('500: DB Error'); }
      return cb(destroyErr, item);
    });
  });
};
