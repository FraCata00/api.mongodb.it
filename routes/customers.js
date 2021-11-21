const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

//GET
router.get('/', async(req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.json({ message: error })
    }
});

//POST
router.post('/', async(req, res) => {
    const customer = new Customer({
        name: req.body.title,
        surname: req.body.description,
        age: req.body.page,
        username: req.body.username
    });
    try {
        const savedCustomer = await customer.save();
        res.json(savedCustomer);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET with ID
router.get('/:customerId', async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId);
        res.json(customer);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE
router.delete('/customerId', async(req, res) => {
    try {
        const removedCustomer = await Customer.remove({ _id: req.params.customerId });
        res.json(removedCustomer);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT
router.patch('/customerId', async(req, res) => {
    try {
        const updatedCustomer = await Customer.updateOne({ _id: req.params.customerId }, { $set: { name: req.body.name } }, { $set: { surname: req.body.surname } }, { $set: { age: req.body.age } }, { $set: { username: req.body.username } }, );
        res.json(updatedCustomer);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;