const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const register = async(req , res , next )=>
{
const  user  = await User.create(req.body); 
user.passward = undefined;
res.send(user);
}
const getAllUsers = (req, res,next)=>{

}

module.exports = {getAllUsers , register }
