import express from 'express';
import app from './index';
import bodyParser from 'body-parser';
import routerMiddleware from './middleware/routerMiddleware';
import authController from './controllers/authController';
import inventoryController from './controllers/inventoryController';

const userRoutes = express.Router();
userRoutes.use(bodyParser.urlencoded({ extended: false }));
userRoutes.use(bodyParser.json());

// All /api routes require Authentication
userRoutes.use('/api', routerMiddleware.authenticateRoutes);

/* -------------------------------------------------------
    User Routes
   ------------------------------------------------------- */
userRoutes.get('/api/users', authController.users); // check
userRoutes.get('/users', authController.users); // check
userRoutes.post('/signup', authController.signUp); // check
userRoutes.post('/signin', authController.signIn); // check

/* -------------------------------------------------------
    Inventory Routes
   ------------------------------------------------------- */
userRoutes.get('/api/cars', inventoryController.showAll); // check
userRoutes.get('/api/:stock_number', inventoryController.getById); // check
userRoutes.post('/api/create', inventoryController.create); // check
userRoutes.post('/api/update/:stock_number', inventoryController.updateItem); // check ( needs error handling )
userRoutes.delete('/api/delete/:stock_number', inventoryController.deleteOne); // check


export default userRoutes;