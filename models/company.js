const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    companyName:  {type: String, required: true},
    phone: {type: String, minlength: 11, maxlength: 14},
    email: {type: String, required: true},
    owner: {type: String, required: true},
    roomnumber: String,
    avatar: String,
    password: {type: String, required: true},
});



const Company = mongoose.model('companys', companySchema)

module.exports = Company