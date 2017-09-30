import express from 'express';
import bodyParser from 'body-parser';
import routerMiddleware from './middleware/routerMiddleware';
import authController from './controllers/authController';
import inventoryController from './controllers/inventoryController';

const routes = express.Router();
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());


// All /api routes require Authentication
routes.use(routerMiddleware.allowCrossOrigin);
routes.use('/api', routerMiddleware.authenticateRoutes);


/* -------------------------------------------------------
    User Routes
   ------------------------------------------------------- */
routes.get('/api/users', authController.users); // check
routes.get('/users', authController.users); // check
routes.post('/signup', authController.signUp); // check
routes.post('/signin', authController.signIn); // check

/* -------------------------------------------------------
    Inventory Routes
   ------------------------------------------------------- */
routes.get('/api/cars', inventoryController.showAll); // check
routes.get('/api/:stock_number', inventoryController.getById); // check
routes.post('/api/create', inventoryController.create); // check
routes.post('/api/update/:stock_number', inventoryController.updateItem); // check ( needs error handling )
routes.delete('/api/delete/:stock_number', inventoryController.deleteOne); // check

export default routes;