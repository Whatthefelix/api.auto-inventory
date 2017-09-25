import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import bodyParser from 'body-parser';

//routes
import userRoutes from './routes';

const app = express();
app.use(userRoutes);
// app.use(userRoutes.)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true});

let port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);

export default app;