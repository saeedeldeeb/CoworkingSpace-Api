const auth = require('../middleware/auth')
const Admin = require('../models/302admin');
const Company = require('../models/company');
const Customer = require('../models/customer');
const Employee = require('../models/employee'); 
const express = require('express');
const router = express.Router();


router.post('/me',auth, async (req, res) => {
    let user;
    switch(req.body.cat){
        case 'company':
            user = await Company.findById(req.user._id).select('-password');
            break;
        case 'employee':
            user = await Employee.findById(req.user._id).select('-password');
            break;
        case 'customer':
            user = await Customer.findById(req.user._id).select('-password');
            break;
        case 'admin':
            user = await Admin.findById(req.user._id).select('-password');
            break;
        default:
            user = {"result":"Error in ........."}
        }
        res.send(user);
  });

router.put('/me/update',async(req,res)=>{
    let updateUser;
    switch(req.body.cat){
        case 'company':
            updateUser = await Company.findByIdAndUpdate(req.body._id,{
                companyName:req.body.newName
            },{new: true});
            break;
        case 'employee':
            updateUser = await Employee.findByIdAndUpdate(req.body._id);
            break;
        case 'customer':
            updateUser = await Customer.findByIdAndUpdate(req.body._id);
            break;
        case 'admin':
            updateUser = await Admin.findByIdAndUpdate(req.body._id);
            break;
        default:
            updateUser = {"result":"Error in ........."}
            break;
        }
        res.send(updateUser);
});

  module.exports = router; 