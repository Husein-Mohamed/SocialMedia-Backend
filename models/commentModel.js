const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new Schema({
    description:{
        type:String,
    },publishDate:{
        type:Date
    }, userId:{
        type:Schema.Types.ObjectID,
        ref:'User'
    }, postId:{
        type:Schema.Types.ObjectID,
        ref:'Post'
    }
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment