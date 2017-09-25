import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../routes';
import jwt from 'jsonwebtoken';
import config from '../config';

// const router = express.router();

const routerMiddleware = {
  authenticateRoutes (req, res, next) {

    let token = req.body.token || req.query.token || req.get('x-access-token');

    if(token) {
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
      return res.status(403).send({
        success: false,
        message: 'No token found'
      });
    }
  }
}

export default routerMiddleware;

