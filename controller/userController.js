const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

exports.index = (req, res, next) => {
  res.status(200).json({
    data: [
      { id: 001, name: "Jiso" },
      { id: 002, name: "Rose" },
    ],
  });
};
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('info. not correct');
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    // check email
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      const error = new Error('email repeat!!');
      error.statusCode = 400;
      throw error;
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);

    await user.save();

    res.status(201).json({
      message: "Register is Done!!",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check email in the system
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('not have user in system');
      error.statusCode = 404;
      throw error;
    }
    //check compare password
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error('Password not correct');
      error.statusCode = 401;
      throw error;
    }
    //creat token
    const token = await jwt.sign({
      id: user._id,
      role: user.role
    }, config.JWT_SECRET, {expiresIn: '5 days'});

    // decode expiresIn
    const expires_in = jwt.decode(token);

    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: 'Bearer',
    });
  } catch (error) {
    next(error);
  }
};
// get profile
exports.me = (req, res, next) => {
  const {_id, name, email, role} = req.user;
  res.status(200).json({
    user: {
        id: _id,
        name: name,
        email: email,
        role: role
    }
  });
};