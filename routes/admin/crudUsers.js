const Admin = require('../../models/302admin');
const Company = require('../../models/company');
const Customer = require('../../models/customer');
const Employee = require('../../models/employee');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const superAdmin = require('../../middleware/superAdmin');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const router = express.Router();

router.post('/getAllUsers',[auth,admin,superAdmin], async (req, res) => {
    console.log(req.body)
    let users;
    switch (req.body.label) {
        case 'company':
            users = await Company.find({ label: req.body.label });
            break;
        case 'customer':
            users = await Customer.find({ label: req.body.label });
            break;
        case 'employee':
            users = await Employee.find({ label: req.body.label });
            break;
        case 'admin':
            users = await Admin.find({ label: req.body.label });
            break;
        default:
            users = { result: 'invalid users' };
    }
    //the reason you can't delete directly some of those properties is that they have been defined as "non-configurable.
    var data = JSON.parse(JSON.stringify(users));
    for (let obj in users) delete data[obj].password;

    res.send(data);
})

router.put('/updateUser',[auth,admin,superAdmin], async (req, res) => {
    params = {
        role: req.body.role,
        name: req.body.name,
        owner: req.body.owner,
        roomNumber: req.body.roomNumber,
        name: req.body.name,
        companyRef: req.body.companyRef,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        label: req.body.label,
    };
    for (let prop in params) if (!params[prop]) delete params[prop];
    //Hashing Users password
    const salt = await bcrypt.genSalt(10);
    if(params.password !=null)
    params.password = await bcrypt.hash(params.password, salt);

    let updateUser;
    switch (req.body.label) {
        case 'company':
            updateUser = await Company.findByIdAndUpdate(req.body._id, params, { new: true });
            break;
        case 'employee':
            updateUser = await Employee.findByIdAndUpdate(req.body._id, params, { new: true });
            break;
        case 'customer':
            updateUser = await Customer.findByIdAndUpdate(req.body._id, params, { new: true });
            break;
        case 'admin':
            updateUser = await Admin.findByIdAndUpdate(req.body._id, params, { new: true });
            break;
        default:
            updateUser = { "result": "Error in ........." }
            break;
    }

    res.send(updateUser);
});


router.delete('/deleteUser',[auth,admin,superAdmin], async (req, res) => {
    mongoose.connection.db.collection('users', async (err, collection) => {
        let user = await collection.findOneAndDelete({ _id: ObjectID(req.body._id) });
        // console.log(user);
        if (user.value == null)
            res.status(400).send('can not delete');
        else
            res.status(200).send('Done')
    })
})
module.exports = router;