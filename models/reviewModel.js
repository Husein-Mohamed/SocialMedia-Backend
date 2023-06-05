const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewSchema = new Schema({
    description:{
        type:String,
    },Rate:{
        type:Number
    }, userId:{
        type:Number,
    }, postId:{
        type:Number
    }
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review