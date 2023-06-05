const joi = require("joi");
const AppError = require("./AppError");

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  userName: joi.string().min(5).max(20).required(),
  passward: joi.string().regex("^[a-zA-Z0-9]{3,30}$").required(),
  role: joi.string().valid("Admin", "User"),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  passward: joi.string().regex("^[a-zA-Z0-9]{3,30}$").required(),
});

const signUpValidtion =  (req , res , next )=> {
   const {error} =  signUpSchema.validate(req.body);
   if (error) return next (new AppError() )
};
