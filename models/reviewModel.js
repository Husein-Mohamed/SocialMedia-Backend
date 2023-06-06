const mongoose = require('mongoose')
const {Schema} = mongoose

const reviewSchema = new Schema({
    description:{
        type:String,
    },rate:{
        type:Number,
        enum:[1,2,3,4,5]
    }, userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }, postId:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review