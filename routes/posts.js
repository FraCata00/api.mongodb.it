const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//GET
router.get('/', async(req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const posts = await Post.find();
        //return res.status(201).send({ status: 'success', message: 'GET Posts Successfully' }).json(posts);
        return res.status(201).json(posts);
    } catch (error) {
        return res.json({ message: error })
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
        //res.setHeader('Content-Type', 'application/json');
        const savedPost = await post.save();
        return res.status(201).send({ status: 'success', message: 'Post Saved Successfully.' }).json(savedPost);
        //res.json({ message: 'Post Saved Successfully.' });
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//GET with ID
router.get('/:_id', async(req, res) => {
    try {
        const post = await Post.findById({ _id: req.params._id });
        res.status(201).json(post);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//DELETE
router.delete('/:_id', async(req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params._id });
        res.status(201).json(removedPost);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//PUT
router.patch('/:_id', async(req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params._id }, { $set: { title: req.body.title } }, { $set: { description: req.body.description } }, { $set: { page: req.body.page } }, { $set: { date: req.body.date } }, { $set: { unit: req.body.unit } });
        res.status(201).json(updatedPost);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

module.exports = router;