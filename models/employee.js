const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name:  {type: String, required: true},
    phone: {type: String, minlength: 11, maxlength: 14},
    email: {type: String, required: true},
    avatar: String,
    password: {type: String, required: true},
    companyRef: {type: String, required: true},
    label:{type:String,required:true},
    fcm_token:String
});



const Employee = mongoose.model('employees', employeeSchema,'users')

module.exports = Employee;
