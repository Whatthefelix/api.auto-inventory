import express from 'express';
import app from './index';
import config from './config';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import routerMiddleware from './middleware/routerMiddleware';

import authController from './controllers/authController';
import inventoryController from './controllers/inventoryController';

const userRoutes = express.Router();
userRoutes.use(bodyParser.urlencoded({ extended: false }));
userRoutes.use(bodyParser.json());

userRoutes.use('/api', routerMiddleware.authenticateRoutes);

userRoutes.use(bodyParser.urlencoded({ extended: false }));
userRoutes.use(bodyParser.json());

/* -------------------------------------------------------
    User Routes
   ------------------------------------------------------- */
userRoutes.get('/api/users', authController.users);
userRoutes.get('/users', authController.users);

userRoutes.post('/setup', authController.setup);
userRoutes.post('/authenticate', authController.authenticate);
/* -------------------------------------------------------
    Inventory Routes
   ------------------------------------------------------- */
userRoutes.get('/api/cars', inventoryController.showAll);
userRoutes.get('/api/:stock_number', inventoryController.getById);
userRoutes.post('/api/create', inventoryController.create);
// userRoutes.post('/api/update/:stock_number', inventoryController.updateItem);




export default userRoutes;