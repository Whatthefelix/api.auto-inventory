'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = function login(req, res, next) {
  if (req.body.username === user.username && req.body.password === user.password) {}
};

var register = function register(req, res, next) {
  var user = new _user2.default({
    username: req.body.username,
    password: req.body.password
  });
};
//# sourceMappingURL=authController.js.map