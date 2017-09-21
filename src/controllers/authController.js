import jwt from 'jsonwebtoken';
import User from '../models/user';

const login = (req, res, next) => {
  if (req.body.username === user.username && req.body.password === user.password) {

  }
};

const register = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
}
