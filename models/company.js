const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, minlength: 11, maxlength: 14 },
    email: { type: String, required: true },
    owner: { type: String, required: true },
    roomNumber: String,
    avatar: { required: false },
    password: { type: String, required: true },
    label: { type: String, required: true },
    role: { type: String, default: 'company' },
    fcm_token: String
});


const Company = mongoose.model('companys', companySchema, 'users')

module.exports = Company;
