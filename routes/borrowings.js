const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');

//GET
router.get('/', async(req, res) => {
    try {
        const borrowings = await Borrowing.find();
        res.status(200).json(borrowings);
    } catch (error) {
        res.json({ message: error })
    }
});

//POST
router.post('/', async(req, res) => {
    const borrowing = new Borrowing({
        borrowing: req.body.borrowing,
        description: req.body.description,
        page: req.body.page,
        date: req.body.date,
        unit: req.body.unit
    });
    try {
        const savedBorrowing = await borrowing.save();
        res.json(savedBorrowing);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET with ID
router.get('/:borrowingId', async(req, res) => {
    try {
        const borrowing = await Borrowing.findById(req.params.borrowingId);
        res.json(borrowing);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE
router.delete('/borrowingId', async(req, res) => {
    try {
        const removedBorrowing = await Borrowing.remove({ _id: req.params.borrowingId });
        res.json(removedBorrowing);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT
router.patch('/borrowingId', async(req, res) => {
    try {
        const updatedBorrowing = await Borrowing.updateOne({ _id: req.params.borrowingId }, { $set: { title: req.body.title } }, { $set: { description: req.body.description } }, { $set: { page: req.body.page } }, { $set: { date: req.body.date } }, { $set: { unit: req.body.unit } });
        res.json(updatedBorrowing);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;