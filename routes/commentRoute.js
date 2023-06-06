const express = require('express');
const {createComment, updateComment, deleteComment} = require('../controllers/commentController')
const verifyToken = require('../utils/VerifyToken')

const router = express.Router();

router.post('/:id', verifyToken, createComment)
router.patch('/:id', verifyToken, updateComment)
router.delete('/:id', verifyToken, deleteComment)

module.exports = router