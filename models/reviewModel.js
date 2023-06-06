const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewSchema = new Schema({
    description:{
        type:String,
    },Rate:{
        type:Number,
        enum:[1,2,3,4,5]
    }, userId:{
        type:Number,
    }, postId:{
        type:Number
    }
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review