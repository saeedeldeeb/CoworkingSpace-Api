const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.post('/', async (req, res) => {
    mongoose.connection.db.collection('users', async (err, collection) => {
        let user = await collection.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');
        if(req.body.password != user.password) 
            res.status(400).send('Invalid email or password.');
        else{
            delete user["password"];
            res.send(user);
        }
    })
});


module.exports = router; 