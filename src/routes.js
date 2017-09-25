import express from 'express';
import app from './index';
import config from './config';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import authController from './controllers/authController';

const userRoutes = express.Router();
userRoutes.use(bodyParser.urlencoded({ extended: false }));
userRoutes.use(bodyParser.json());

userRoutes.get('/users', authController.users);

userRoutes.post('/setup', authController.setup);
userRoutes.post('/authenticate', authController.authenticate);

export default userRoutes;