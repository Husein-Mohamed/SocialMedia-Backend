const express = require('express');
const {createReview, updateReview, deleteReview} = require('../controllers/reviewController')
const router = express.Router();

router.post('/', createReview)
router.delete('/:id', updateReview)
router.patch('/:id', deleteReview)

module.exports = router