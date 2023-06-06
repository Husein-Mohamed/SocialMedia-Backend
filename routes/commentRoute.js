const express = require('express');
const {createComment, updateComment, deleteComment} = require('../controllers/commentController')
const verifyToken = require('../utils/VerifyToken')

const router = express.Router();

router.post('/', verifyToken, createComment)
router.patch('/', verifyToken, updateComment)
router.delete('/', verifyToken, deleteComment)

module.exports = router