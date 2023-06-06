const mongoose = require('mongoose')
const Comment = require('../models/commentModel')

const createComment = async(req, res)=>{
    const {description, postId} = req.body
    if(!req.Admin){
        const comment = new Comment({description, publishDate:new Date(), userId:req.user._id, postId: new mongoose.Types.ObjectId(postId)})
        await comment.save()
        res.send(comment)
    } else {
        res.send("Admin Cant Add comment")
    }
}

const updateComment = async(req, res) => {
    const comment = await Comment.findOneAndUpdate({userId:req.user._id, postId: new mongoose.Types.ObjectId(req.body.postId)}, req.body)
    res.send(comment)
}

const deleteComment = async(req, res) => {
    await Comment.findOneAndDelete({userId:req.user._id,  postId: new mongoose.Types.ObjectId(req.body.postId)})
    res.send("Comment Deleted Successfully !!")
}

module.exports = {createComment, updateComment, deleteComment}