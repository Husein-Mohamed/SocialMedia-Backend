const joi = require("joi");
const AppError = require("./AppError");


const strongPasswordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")
const signUpSchema = joi.object({
  email: joi.string().email().required(),
  userName: joi.string().min(2).max(20).required(),
  password: joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
  role: joi.string().valid("Admin", "User"),
});
const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().regex(strongPasswordRegex).error(stringPassswordError).required(),
});
const findByEmailSchema = joi.object({
  email: joi.string().email().required(),
  });
const UpdateSchema = joi.object({
  email: joi.string().email(),
  userName: joi.string().min(2).max(20),
  password: joi.string().regex(strongPasswordRegex).error(stringPassswordError),
  role: joi.string().valid("Admin", "User"),
});

const signUpValidtion =  (req , res , next )=> {
   const {error} =  signUpSchema.validate(req.body);
   if (error) return next (new AppError(error.message , 404) )
   next()
};
const logInValidtion =  (req , res , next )=> {
  const {error} =  loginSchema.validate(req.body);
  if (error) return next (new AppError(error.message , 404) )
  next()
};
const updateValidtion =  (req , res , next )=> {
  const {error} =  UpdateSchema.validate(req.body);
  if (error) return next (new AppError(error.message , 404) )
  next()
};
const findByEmailValidtion =  (req , res , next )=> {
  const {error} =  findByEmailSchema.validate(req.body);
  if (error) return next (new AppError(error.message , 404) )
  next()
};

module.exports = {signUpValidtion , logInValidtion , updateValidtion , findByEmailValidtion}