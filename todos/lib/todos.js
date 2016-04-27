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
  Todo.scan().loadAll().exec((err, res) => {
    const items = res ? res.Items : [];
    return cb(err, items);
  });
};

module.exports.show = function show(params, cb) {
  Todo.get(params.pathId, cb);
};

module.exports.create = function create(params, cb) {
  const data = params.body || params;
  Todo.create(data, cb);
};

module.exports.update = function update(params, cb) {
  Todo.get(params.pathId, (err, item) => {
    if (err) {
      return cb(err, item);
    }
    if (!item) {
      return cb('No matching todo found');
    }

    const data = item.get();
    const body = params.body || params;
    _.assign(data, _.pick(body, ['title', 'done']));
    return Todo.update(data, cb);
  });
};

module.exports.remove = function remove(params, cb) {
  Todo.destroy(params.pathId, cb);
};
