const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
var jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const user = await User.create(req.body);
  user.passward = undefined;
  var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT);
  res.send({ user, token: token });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select(+"password");
  if (!user) return next(new AppError("this email is not Exist", 404));
  let passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) return next(new AppError("credentials error ", 404));
  var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT);
  res.send({ token: token });
};

const updateUser = async (req, res, next) => {
  const newData = req.body;
  if (!newData)
    return next(new AppError("Please provide data to update user ", 404));
  const user = req.user;
  const newUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $set: newData }
  );
  res.send(newUser);
};
const getAllUsers =async (req, res, next) => {
  if (!req.Admin)
  return next (new AppError("You are not Admin", 404) );
  let users = await User.find();
  res.send(users);
};
const deleteUser = async (req, res, next) => {
 const user = req.user;
  await User.findByIdAndDelete({_id:user._id})
  res.send('User deleted Successfully !!')
};
const deleteUserByEmail = async (req, res, next) => {
  const user = req.user;
  if(!req.Admin)
  return next (new AppError("You are not Admin", 404) ); 
  const {email} = req.body ; 
  await User.findOneAndDelete({email:email})
   res.send('User deleted Successfully !!')
 };
 const getUserByEmail = async (req, res, next) => {
  const {email} = req.body ; 
 let user =  await User.findOne({email:email})
   res.send(user)
 };


  const addUser = async (req, res, next) => {
    const user = req.user;
    if(!req.Admin)
    return next (new AppError("You are not Admin", 404) ); 
  const newUser = await User.create(req.body);
  user.passward = undefined;
  var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_JWT);
  res.send({ user, token: token });
};
const getUserData = async (req, res, next) => {
  req.user.passward =undefined;
  res.send(req.user);
};

module.exports = { getAllUsers, register, login, updateUser , deleteUser  , getUserData , deleteUserByEmail, addUser , getUserByEmail};
