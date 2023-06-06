const express = require('express');
const {createReview, updateMyReview, deleteReview, getReviewById, getAllReviews, updateReview, deleteAllReview} = require('../controllers/reviewController')
const verifyToken = require('../utils/VerifyToken')

const router = express.Router();

//! User
router.post('/:id',verifyToken, createReview)
router.delete('/:id',verifyToken, deleteReview)
router.patch('/:id',verifyToken, updateMyReview)
router.get('/:id', verifyToken, getReviewById)

//! admin
router.patch('/Admin/:id',verifyToken, updateReview )
router.get('/', verifyToken, getAllReviews)
router.delete('/', verifyToken, deleteAllReview)

module.exports = router