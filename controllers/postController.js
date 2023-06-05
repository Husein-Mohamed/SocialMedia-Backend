const Post = require('../models/post')

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

module.exports = {createPost, getAllPosts, getPostById, updatePostById, deletePostById}