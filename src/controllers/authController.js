import app from '../index';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import bcrypt from 'bcrypt';
import config from '../config';

const authController = {

  signUp (req, res) {
    let user = new User({
      username: req.body.username,
      password: req.body.password,
      created_at: Date.now(),
      updated_at: null
    });

    user.save((err) => {
      if (err && err.code === 11000) {
        res.json({
          success: false,
          status: 400,
          message: 'User already exists'
        });
        return;
      };

      res.json({
        success: true,
        status: 201,
        message: 'User has been created'
      });
    });
  },

  signIn (req, res) {
    User.findOne({
      username: req.body.username
    }, (error, user) => {
      if (error) throw error;

      if (!user) {
        res.json({
          success: false,
          message: 'No user found',
          status: 400
        });
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
          if (isMatch && !err) {
            let token = jwt.sign({data: user}, config.secret);
            res.json({
              success: true,
              message: 'Token received',
              token: token
            });
          } else {
            res.send({
              success: false,
              message: 'password no work'
            });
          }
        });
      }
    });
  },

  users (req, res) {
    User.find({}, (err, users) => {
      if(err) throw err;
      res.json(users);
    });
  }
}

export default authController;