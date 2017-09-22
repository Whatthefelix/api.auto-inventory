import express from 'express';
import User from './models/user';
import mongoose from 'mongoose';
import config from './config';
import bodyParser from 'body-parser';

//routes
import userRouter from './routes';

const app = express();
app.use(userRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.post('/authenticate2', (req, res) => {
//   console.log(req.body);
//   User.find({username: req.body.username}).limit(1)
//   .next((arrow, user) => {
//     if (arrow) throw arrow;
//     if (!user) {
//       res.json({
//         success: false,
//         message: 'get rekt kiddo'
//       });
//     } else {
//       res.json({
//         success: true,
//         message: 'hey it worked'
//       });
//     }
//   });
// });


mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true});


let port = process.env.PORT || 3000;

app.listen(port);
console.log('RESTful API server started on: ' + port);
app.get('/', (req, res) => {
  res.send('hallo');
});

export default app;