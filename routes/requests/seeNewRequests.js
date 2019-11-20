const RentRequests = require('../../models/rentRequests');
const CofeRequests = require('../../models/cofeRequests');
const forRents = require('../../models/forRent')
const cafee = require('../../models/cafeteria')
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/admin');
const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const express = require('express');
const router = express.Router();

router.post('/getNewRentReq', [auth, isAdmin], async (req, res) => {
    let notSeenRequests, userData, productData;
    console.log(req.body);

    switch (req.body.role) {
        case 'rentAdmin':
            notSeenRequests = await RentRequests.find({ status: req.body.status });
            break;
        case 'cofeAdmin':
            notSeenRequests = await CofeRequests.find({ status: req.body.status });
            break;
        default:
            return res.status(400).send('role not correct')
    }
    mongoose.connection.db.collection('users', async (err, collection) => {
        userData = await Promise.all(notSeenRequests.map(async (user) => {
            return await collection.findOne({ _id: ObjectID(user.demanderID) });
        }))
        

        switch (req.body.role) {
            case 'rentAdmin':
                productData = await Promise.all(notSeenRequests.map(async (user) => {
                    return await forRents.findOne({ _id: ObjectID(user.productID) });
                }))
                break;
            case 'cofeAdmin':
                productData = await Promise.all(notSeenRequests.map(async (user) => {
                    return await cafee.findOne({ _id: ObjectID(user.productID) });
                }))
                break;
        }

        notSeenRequests = notSeenRequests.map((notSeenRequestObj) => {
            let foundEmployee = userData.find((userDataObj) => {                
                return String(notSeenRequestObj.demanderID) === String(userDataObj._id)
            });
            let foundItem = productData.find((productDataObj) => {
                return String(notSeenRequestObj.productID) === String(productDataObj._id)
            });


            return { notSeenRequestObj, foundItem, user: foundEmployee };
        });

        res.send(notSeenRequests);

    })
})

router.put('/requestStatus', [auth, isAdmin], async (req, res) => {
    console.log(req.body);

    let changeStatus;
    switch (req.body.role) {
        case 'rentAdmin':
        case 'superAdmin':
            changeStatus = await RentRequests.findByIdAndUpdate(req.body._id, { status: req.body.newStatus }, { new: true });
        case 'cofeAdmin':
        case 'superAdmin':
            changeStatus = await CofeRequests.findByIdAndUpdate(req.body._id, { status: req.body.newStatus }, { new: true });
    }
    res.send(changeStatus);
})

module.exports = router;