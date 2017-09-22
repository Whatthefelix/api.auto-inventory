'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: Date,
  updated_at: Date
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password') || user.isNew) {
    _bcrypt2.default.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      _bcrypt2.default.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (pw, cb) {
  _bcrypt2.default.compare(pw, undefined.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

var User = _mongoose2.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map