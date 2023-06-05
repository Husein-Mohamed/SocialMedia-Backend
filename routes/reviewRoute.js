const express = require('express');
const {createReview, updateReview, deleteReview} = require('../controllers/reviewController')
const verifyToken = require('../utils/VerifyToken')

const router = express.Router();

router.post('/',verifyToken, createReview)
router.delete('/:id',verifyToken, updateReview)
router.patch('/:id',verifyToken, deleteReview)

module.exports = router