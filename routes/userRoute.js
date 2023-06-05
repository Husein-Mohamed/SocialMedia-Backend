const express = require('express');
const router = express.Router();
const {getAllUsers, register } = require('../controllers/userController');
const {uploadToMulter, uploadPP} = require('../utils/multerConfig');
router.post('/', register);
router.post('/upload',uploadToMulter ,uploadPP )
router.get('/', getAllUsers) ; 


module.exports = router 
