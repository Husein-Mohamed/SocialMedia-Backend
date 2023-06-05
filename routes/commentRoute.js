const express = require('express');
const {createComment, updateComment, deleteComment} = require('../controllers/commentController')
const router = express.Router();

router.post('/', createComment)
router.patch('/:id', updateComment)
router.delete('/:id', deleteComment)

module.exports = router