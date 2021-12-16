const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

//GET
router.get('/', async(req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.json({ message: error })
    }
});

//POST
router.post('/', async(req, res) => {
    const customer = new Customer({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedCustomer = await customer.save();
        res.status(200).json(savedCustomer);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET with ID
router.get('/:customerId', async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId);
        res.status(200).json(customer);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE
router.delete('/customerId', async(req, res) => {
    try {
        const removedCustomer = await Customer.remove({ _id: req.params.customerId });
        res.status(200).json(removedCustomer);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT
router.patch('/customerId', async(req, res) => {
    try {
        const updatedCustomer = await Customer.updateOne({ _id: req.params.customerId }, { $set: { name: req.body.name } }, { $set: { surname: req.body.surname } }, { $set: { age: req.body.age } }, { $set: { username: req.body.username } }, { $set: { email: req.body.email } }, { $set: { password: req.body.password } }, );
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;