const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let user;
router.post('/', async (req, res) => {
    mongoose.connection.db.collection('users', async (err, collection) => {
        user = await collection.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');
        if (req.body.password != user.password)
            res.status(400).send('Invalid email or password.');
        else {
            delete user["password"];
            const token = generateAuthToken();
            res.send({userData:user,token:token});
        }
    })

});

const generateAuthToken = function () {
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    return token;
}

module.exports = router; 