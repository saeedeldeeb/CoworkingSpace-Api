const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    role:  {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    label:{type:String,required:true}
});



const Admin = mongoose.model('admins', adminSchema,'users')

module.exports = Admin