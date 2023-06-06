const express = require('express');
const router = express.Router();
const {getAllUsers, register , login ,  updateUser  ,deleteUser , getUserData , deleteUserByEmail , addUser, getUserByEmail} = require('../controllers/userController');
const {uploadToMulter, uploadPP} = require('../utils/multerConfig');
const {signUpValidtion , logInValidtion , updateValidtion ,findByEmailValidtion} = require('../utils/Validation');
const verifyToken = require('../utils/VerifyToken');

router.post('/register', signUpValidtion , register);
router.post('/login', logInValidtion , login);

router.post('/upload',verifyToken,uploadToMulter ,uploadPP )
router.patch('/update' ,updateValidtion ,verifyToken,updateUser )
router.delete('/' , verifyToken , deleteUser )
router.get ('/',verifyToken ,getUserData)
router.get('/getuserdata' , verifyToken , findByEmailValidtion,getUserByEmail)


router.post('/admin', signUpValidtion , verifyToken , addUser);
router.post('/admin/login', logInValidtion , login);
router.get('/admin',verifyToken ,getAllUsers); 
router.delete('/admin' , verifyToken ,findByEmailValidtion ,deleteUserByEmail )


module.exports = router 
