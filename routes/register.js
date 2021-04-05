const Admin = require('../models/302admin');
const Company = require('../models/company');
const Customer = require('../models/customer');
const Employee = require('../models/employee');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/allCompanies', async (req, res) => {
    const companies = await Company.find({ label: 'company' }).select('name').sort('name');
    res.send(companies);
});


router.post('/register', async (req, res) => {

    var addUser;
    mongoose.connection.db.collection('users', async (err, collection) => {
        addUser = await collection.findOne({ email: req.body.email });
        if (addUser) return res.status(400).send('User already registered.');

        const salt = await bcrypt.genSalt(10);
        switch (req.body.label) {
            case 'company':
                addUser = new Company(_.pick(req.body, ['name', 'email', 'password', 'phone', 'owner', 'roomNumber', 'label']));
                addUser.password = await bcrypt.hash(addUser.password, salt);
                break;
            case 'employee':
                addUser = new Employee(_.pick(req.body, ['name', 'email', 'password', 'phone', 'companyRef', 'label']));
                addUser.password = await bcrypt.hash(addUser.password, salt);
                break;
            case 'customer':
                addUser = new Customer(_.pick(req.body, ['name', 'email', 'password', 'phone', 'label']));
                addUser.password = await bcrypt.hash(addUser.password, salt);
                break;
            case 'admin':
                addUser = new Admin(_.pick(req.body, ['email', 'password', 'role', 'label']));
                addUser.password = await bcrypt.hash(addUser.password, salt);
                break;
            default:
                addUser = { "result": "Not correct label" }
                return res.send(addUser);
        }
        await addUser.save();

        res.send(addUser);
    });
});

module.exports = router;
