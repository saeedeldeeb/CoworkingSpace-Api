const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name:  {type: String, required: true},
    phone: {type: String, minlength: 11, maxlength: 14},
    email: {type: String, required: true},
    password: {type: String, required: true},
});



const Customer = mongoose.model('customers', customerSchema)

module.exports = Customer