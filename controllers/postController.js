const Post = require('../models/postModel')

const createPost = async(req, res)=>{
    const {title, userId} = req.body
    const post =  new Post({title, userId, publishDate:new Date()})
    await post.save()
    res.send(post)
}

const getAllPosts = async(req, res)=>{
    const post = await Post.find({})
    req.send(post)
}

const getPostById = async(req, res)=>{
    const post = await Post.findById({_id:req.params.id})
    res.send(post)
}

const updatePostById = async(req, res)=>{
    const post = await Post.findByIdAndUpdate({_id:req.params.id}, req.body)
    res.send(post)
}

const deletePostById = async(req, res)=>{
    await Post.findByIdAndDelete({_id:req.params.id})
    res.send('Post deleted Successfully !!')
}

const deleteAllPosts = async(req, res)=>{
    await Post.deleteMany({})
    res.send('All Posts of You Deleted Successfully !')
}

module.exports = {createPost, getAllPosts, getPostById, updatePostById, deletePostById, deleteAllPosts}