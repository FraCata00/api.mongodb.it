const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

//GET
router.get('/', async(req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const customers = await Customer.find();
        //return res.status(201).send({ status: 'success', message: 'GET Customer Successfully' }).json(customers);
        return res.status(201).json(customers);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
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
        return res.status(201).send({ status: 'success', message: 'Customer Saved Successfully.' }).json(savedCustomer);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//GET with ID
router.get('/:_id', async(req, res) => {
    try {
        const customer = await Customer.findById(req.params._id);
        res.status(201).json(customer);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//DELETE
router.delete('/:_id', async(req, res) => {
    try {
        const removedCustomer = await Customer.remove({ _id: req.params._id });
        res.status(201).json(removedCustomer);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

//PUT
router.patch('/:customerId', async(req, res) => {
    try {
        const updatedCustomer = await Customer.updateOne({ _id: req.params.customerId }, { $set: { name: req.body.name } }, { $set: { surname: req.body.surname } }, { $set: { age: req.body.age } }, { $set: { username: req.body.username } }, { $set: { email: req.body.email } }, { $set: { password: req.body.password } }, );
        res.status(200).json(updatedCustomer);
    } catch (error) {
        return res.status(404).status({ status: 'error' }).json({ message: error });
    }
});

module.exports = router;