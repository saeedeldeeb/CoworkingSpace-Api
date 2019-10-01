const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    name:  {type: String, required: true},
    role:  {type: Number, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
});



const Admin = mongoose.model('admins', adminSchema)

module.exports = Admin