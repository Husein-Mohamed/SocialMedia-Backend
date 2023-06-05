const jwt = require('jsonwebtoken') 
const User = require('../models/userModel');
const AppError = require('./AppError');

module.exports = async(req, res , next )=>{
    let token  = req.headers.authorization ; 
    if (!token) return next (new AppError("Please provide a token ", 401));
    const {id} =   await jwt.verify(token , process.env.SECRET_KEY_JWT); 
    let user  = await User.findOne({_id:id});
    if (!user) return next (new AppError("Please provide a valid  token ", 401));
    req.user = user ; 
    if (user.role == 'Admin')
    req.Admin = true ; 
    next ();
}