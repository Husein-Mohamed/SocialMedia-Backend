const express = require('express');
const {createComment, updateComment, deleteComment} = require('../controllers/commentController')
const router = express.Router();

router.post('/', createComment)
router.delete('/:id', updateComment)
router.update('/:id', deleteComment)

module.exports = router