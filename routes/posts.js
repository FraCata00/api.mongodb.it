const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GET
router.get('/', async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.json({ message: error })
    }
});

//POST
router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        page: req.body.page,
        date: req.body.date,
        unit: req.body.unit
    });
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET with ID
router.get('/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE
router.delete('/postId', async(req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.status(200).json(removedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT
router.patch('/postId', async(req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } }, { $set: { description: req.body.description } }, { $set: { page: req.body.page } }, { $set: { date: req.body.date } }, { $set: { unit: req.body.unit } });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;