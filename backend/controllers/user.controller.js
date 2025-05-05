const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req); // any errors that occur in the post request at /register will be acquired here.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password"); //".select('+password')" is added because we want the password to be selected when we use .findOne.(Remember in the user.model.js we had set select:false fro password).
  //We require the password here because we need to check the login credentials.

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password); // We created this comparePassword method in the user.model.js

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  //if both email and password are correct, we create a token
  const token = user.generateAuthToken();

  res.status(200).json({ token, user });
};
