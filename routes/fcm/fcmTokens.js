const  Admin = require('../../models/302admin');
const  Company = require('../../models/company');
const  Customer = require('../../models/customer');
const Employee = require('../../models/employee');
const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();

router.put('/updateFcmTokens',auth,async(req,res)=>{
    let updateUser;
    switch (req.body.label) {
        case 'company':
            updateUser = await Company.findByIdAndUpdate(req.body._id, {fcm_token:req.body.fcm_token}, { new: true });
            break;
        case 'employee':
            updateUser = await Employee.findByIdAndUpdate(req.body._id, {fcm_token:req.body.fcm_token}, { new: true });
            break;
        case 'customer':
            updateUser = await Customer.findByIdAndUpdate(req.body._id, {fcm_token:req.body.fcm_token}, { new: true });
            break;
        case 'admin':
            updateUser = await Admin.findByIdAndUpdate(req.body._id, {fcm_token:req.body.fcm_token}, { new: true });
            break;
        default:
            updateUser = { "result": "Error in ........." }
            break;
    }

    res.send(updateUser);
});

module.exports = router;