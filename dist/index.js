'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.database, { useMongoClient: true });

var port = process.env.PORT || 3000;

app.listen(port);
console.log('RESTful API server started on: ' + port);
app.get('/', function (req, res) {
  res.send('hallo');
});

app.get('/setup', function (req, res) {
  var kenny = new _user2.default({
    username: 'Kenneth Dalvinder',
    password: 'password',
    created_at: Date.now(),
    updated_at: null
  });

  kenny.save(function (err) {
    if (err) throw err;
    console.log('Kenny saved successfully');
    res.json({
      success: true,
      status: 201
    });
  });
});

exports.default = app;
//# sourceMappingURL=index.js.map