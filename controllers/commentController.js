const mongoose = require('mongoose')
const Comment = require('../models/commentModel')
const AppError = require('../utils/AppError')

const createComment = async(req, res)=>{
    const {description} = req.body
    if(req.Admin) return next(new AppError("Admin Can't Add Comment", 403))
    const comment = new Comment({description, publishDate:new Date(), userId:req.user._id, postId: req.params.id})
    if(!comment) return next(new AppError('This Post Not Found', 404))
    await comment.save()
    res.send(comment)
}

const updateComment = async(req, res, next) => {
    const comment = await Comment.findOne({_id:req.params.id})
    if(!comment) return next(new AppError('Comment Not Found !', 404))
    if(JSON.stringify(comment.userId) !== JSON.stringify(req.user._id)) return next(new AppError('Unauthorize Update', 403))

    const newComment = await Comment.findOneAndUpdate({_id:req.params.id, userId:req.user._id}, req.body)
    res.send(newComment)
}

const deleteComment = async(req, res) => {
    const comment = await Comment.findOne({_id:req.params.id})
    if(!comment) return next(new AppError('Comment Not Found !', 404))
    if(JSON.stringify(comment.userId) !== JSON.stringify(req.user._id)) return next(new AppError('Unauthorize Update', 403))

    await Comment.findOneAndDelete({userId:req.user._id,  _id: req.params.id})
    res.send("Comment Deleted Successfully !!")
}

module.exports = {createComment, updateComment, deleteComment}