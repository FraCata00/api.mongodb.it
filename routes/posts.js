const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GET
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(error){
        res.json({ message: error })
    }
});

//POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        page: req.body.page
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(error){
        res.json({ message: error });
    }
});

//GET with ID
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(error){
        res.json({ message: error});
    }
});

//DELETE
router.delete('/postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({ _id: req.params.postId});
        res.json(removedPost);
    }catch(error){
        res.json({ message: error });
    }
});

//PUT
router.patch('/postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set : { title: req.body.title } },
            { $set: { description: req.body.description } },
            { $set: { page: req.body.page } },
            );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;