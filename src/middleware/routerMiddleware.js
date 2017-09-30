import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../routes';
import jwt from 'jsonwebtoken';
import config from '../config';

const routerMiddleware = {
  authenticateRoutes (req, res, next) {

    let token = req.body.token || req.query.token || req.get('Authorization');

    if (token) {
      console.log('req.get(authorization): ');
      console.log(req.get('Authorization'));
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Invalid token'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'No token found'
      });
    }
  },

  // Allow CORS
  allowCrossOrigin (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization");
    next();
  }
}

export default routerMiddleware;

