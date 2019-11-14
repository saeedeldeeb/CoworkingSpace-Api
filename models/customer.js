const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:  {type: String, required: true},
    phone: {type: String, minlength: 11, maxlength: 14},
    email: {type: String, required: true},
    password: {type: String, required: true},
    label:{type:String,required:true},
    fcm_token:String
});

const Customer = mongoose.model('customers', customerSchema,'users');

module.exports = Customer
