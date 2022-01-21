const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');

//GET
router.get('/', async(req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const borrowings = await Borrowing.find();
        return res.status(201).json(borrowings);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//POST
router.post('/', async(req, res) => {
    const borrowing = new Borrowing({
        idPost: req.body.idPost,
        idCustomer: req.body.idCustomer,
        date: req.body.date,
        unit: req.body.unit
    });
    try {
        const savedBorrowing = await borrowing.save();
        return res.status(201).send({ status: 'success', message: 'Borrowing Saved Successfully.' }).json(savedBorrowing);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//GET with ID
router.get('/:_id', async(req, res) => {
    try {
        const borrowing = await Borrowing.findById(req.params._id);
        return res.status(201).send({ status: 'success', message: 'GET Borrowing Successfully' }).json(borrowing);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//DELETE
router.delete('/:_id', async(req, res) => {
    try {
        const removedBorrowing = await Borrowing.remove({ _id: req.params._id });
        res.json(removedBorrowing);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//PUT
router.patch('/:_id', async(req, res) => {
    try {
        const updatedBorrowing = await Borrowing.updateOne({ _id: req.params._id }, { $set: { idPost: req.body.idPost } }, { $set: { idCustomer: req.body.idCustomer } }, { $set: { date: req.body.date } }, { $set: { unit: req.body.unit } });
        res.status(201).json(updatedBorrowing);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

module.exports = router;