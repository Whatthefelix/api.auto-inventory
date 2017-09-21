import express from 'express';
import User from './models/user';
import mongoose from 'mongoose';
import config from './config';

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true});


let port = process.env.PORT || 3000;

app.listen(port);
console.log('RESTful API server started on: ' + port);
app.get('/', (req, res) => {
  res.send('hallo');
});

app.get('/setup', (req, res) => {
  let kenny = new User({
    username: 'Kenneth Dalvinder',
    password: 'password',
    created_at: Date.now(),
    updated_at: null
  });

  kenny.save((err) => {
    if (err) throw err;
    console.log('Kenny saved successfully');
    res.json({
      success: true,
      status: 201
    })
  });

});

export default app;