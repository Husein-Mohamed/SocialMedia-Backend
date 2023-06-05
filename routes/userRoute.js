const express = require('express');
const router = express.Router();
const {getAllUsers, register , login ,  updateUser  ,deleteUser} = require('../controllers/userController');
const {uploadToMulter, uploadPP} = require('../utils/multerConfig');
const {signUpValidtion , logInValidtion , updateValidtion } = require('../utils/Validation');
const verifyToken = require('../utils/VerifyToken');

router.post('/register', signUpValidtion , register);
router.post('/login', logInValidtion , login);
router.post('/upload',verifyToken, uploadToMulter , uploadPP);
router.patch('/update' ,updateValidtion ,verifyToken,updateUser);
router.delete('/delete' , verifyToken , deleteUser);


router.post('/admin/register', signUpValidtion , register);
router.post('/admin/login', logInValidtion , login);
router.get('/admin',verifyToken ,getAllUsers); 


module.exports = router 
