const express = require('express');
const {createPost, getAllPosts, getPostById, updatePostById, deletePostById, deleteAllPosts} = require('../controllers/postController')
const router = express.Router();

router.post('/', createPost)
router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.patch('/:id', updatePostById)
router.delete('/:id', deletePostById)
router.delete('/', deleteAllPosts)

module.exports = router