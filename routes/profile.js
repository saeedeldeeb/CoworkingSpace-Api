const auth = require('../middleware/auth')
const Admin = require('../models/302admin');
const Company = require('../models/company');
const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
const Employee = require('../models/employee');
const multer = require('multer');
const express = require('express');
const router = express.Router();


router.post('/me', auth, async (req, res) => {
    let user;
    switch (req.body.cat) {
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
            user = { "result": "Error in ........." }
    }
    res.send(user);
});

router.post('/me/update', auth, async (req, res) => {
    params = {
        name: req.body.name,
        roomNumber: req.body.roomNumber,
        name: req.body.name,
        companyRef: req.body.companyRef,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.newpass,
    };
    for (let prop in params) if (!params[prop]) delete params[prop];
    //Hashing Users password
    const salt = await bcrypt.genSalt(10);
    if (params.password != null)
        params.password = await bcrypt.hash(params.password, salt);

    userData = 'userData';
    updateUsers = {};
    switch (req.body.label) {
        case 'company':
            updateUsers = await Company.findByIdAndUpdate(req.user._id, params, { new: true });
            break;
        case 'employee':
            updateUsers = await Employee.findByIdAndUpdate(req.user._id, params, { new: true });
            break;
        case 'customer':
            updateUsers = await Customer.findByIdAndUpdate(req.user._id, params, { new: true });
            break;
        case 'admin':
            updateUsers = await Admin.findByIdAndUpdate(req.user._id, params, { new: true });
            break;
        default:
            updateUsers = { "result": "Error in ........." }
            break;
    }

    let updateUser = { userData: updateUsers };
    res.send(updateUser);
});
var randNum = Math.floor(Math.random() * Math.floor(1000));

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/profileImage')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${randNum}Coworking_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

//let upload = multer({ dest: 'uploads/' })

// Uploading image
router.post('/image', auth, upload.single('file'), async (req, res) => {
    // console.log(randNum);
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    let user;
    switch (req.user.label) {
        case 'company':
            user = await Company.findByIdAndUpdate(req.user._id, { avatar: file.filename }, { new: true });
            break;
        case 'employee':
            user = await Employee.findByIdAndUpdate(req.user._id, { avatar: file.filename }, { new: true });
            break;
        default:
            user = { "result": "Error" }
            break;
    }
    delete user["password"]
    res.send(user);
})

module.exports = router; 