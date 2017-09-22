import express from 'express';
import app from './index';
import mongoose from 'mongoose';
import User from './models/user';
import config from './config';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

  const userRoutes = express.Router();
  userRoutes.use(bodyParser.urlencoded({ extended: false }));
  userRoutes.use(bodyParser.json());

  userRoutes.get('/setup', (req, res) => {
    let kenny = new User({
      username: 'Kenneth Dalvinder',
      password: 'password',
      created_at: Date.now(),
      updated_at: null
    });

    kenny.save((err) => {
      if (err && err.code === 11000) {
        res.json({
          success: false,
          status: 400,
          message: 'User already exists'
      });

        return;
      };
      console.log('Kenny saved successfully');
      res.json({
        success: true,
        status: 201
      });
    });

  });

  userRoutes.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      if(err) throw err;
      res.json(users);
    });
  });

  userRoutes.post('/authenticate', (req, res) => {
    User.findOne({
      username: req.body.username
    }, (arrow, user) => {
      if (arrow) throw arrow;

      if (!user) {
        res.json({
          success: false,
          message: 'No user found',
          status: 400
        });
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
          if (isMatch && !err) {
            let token = jwt.sign({data: user}, config.secret, {
              expiresIn: 1440
            });
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
  });



export default userRoutes;