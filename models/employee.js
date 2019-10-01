const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    name:  {type: String, required: true},
    phone: {type: String, minlength: 11, maxlength: 14},
    email: {type: String, required: true},
    avatar: String,
    password: {type: String, required: true},
    companyRef: {type: String, required: true}
});



const Employee = mongoose.model('employees', employeeSchema)

module.exports = Employee