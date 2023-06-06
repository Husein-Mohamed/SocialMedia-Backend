const mongoose = require('mongoose')
const Review = require('../models/reviewModel')
const Post = require('../models/postModel')
const AppError = require('../utils/AppError')

//* Create review (User)
const createReview = async(req, res, next)=>{
    const {description, rate} = req.body
    if(req.Admin) return next(new AppError("Admin Can't Add Review", 403)) 
    const post = await Post.findById({_id:req.params.id})
    if(!post) return next(new AppError('This Post Not Found', 404))
    const review = new Review({description, rate, publishDate:new Date(), userId:req.user._id, postId: req.params.id})
    await review.save()
    res.send(review)
}

//* Get All review (Admin)
const getAllReviews = async(req, res, next) => {
    if(!req.Admin) return next(new AppError('Unauthorized access', 403))
    const reviews = await Review.find({}).populate('userId').populate('postId')
    res.send(reviews)
}

//* Get reviewById (Admin, User)
const getReviewById = async(req, res, next)=>{
    const review = await Review.findById({_id:req.params.id}).populate('userId').populate('postId')
    if(!review) return next(new AppError('This Review Not Found', 404))
    res.send(review)
}

//* Update Your Review (Admin, User)
const updateMyReview = async(req, res, next) => {
    const review = await Review.findById({_id:req.params.id})
    if(!review) return next(new AppError('No Post found', 404))
    if(JSON.stringify(review.userId) !== JSON.stringify(req.user._id)) return next(new AppError('Unauthorize Update', 403))

    //? Update Review
    const updatedReview = await Review.findOneAndUpdate({userId:req.user._id, _id:req.params.id},  req.body)

    //? Get Updated Review
    const newReview = await Review.findById({userId:req.user._id, _id:req.params.id})

    //? Compare old and new Review
    if(JSON.stringify(updatedReview) === JSON.stringify(newReview)) res.send("No Thing Updated here !")
    res.send(newReview)
}

//* Update Any Review (Admin)
const updateReview = async(req, res, next) => {
    if(!req.Admin) return next(new AppError('Unauthorize Update', 403))

    const review = await Review.findByIdAndUpdate({_id:req.params.id}, req.body)
    if(!review) return next(new AppError('Review Not Found', 404))

    const newReview = await Review.findById({_id:req.params.id})
    if(JSON.stringify(review) === JSON.stringify(newReview)) res.send("No Thing Updated here !")
    res.send(newReview) 
}

//* Delete ReviewBy Id 
const deleteReview = async(req, res, next) => {
    const review = await Review.findById({_id:req.params.id})

    if(!review) return next(new AppError('No Post found', 404))
    if(JSON.stringify(review.userId) !== JSON.stringify(req.user._id)) return next(new AppError('Unauthorize Delete', 403))
    
    await Review.findByIdAndDelete({userId:req.user._id, _id:req.params.id})
    res.send("review Deleted Successfully !!")
}

//* Delete All Reviews
const deleteAllReview = async(req, res, next) => {
    if(!req.Admin) return next(new AppError(new AppError('Unauthorize Delete', 403)))
    await Review.deleteMany({})
    res.send("All Reviews Deleted Successfully!")
}

module.exports = {createReview, updateMyReview, deleteReview, getReviewById, getAllReviews, updateReview, deleteAllReview}