const mongoose = require('mongoose');

const cofeRequestSchema = new mongoose.Schema({
    demanderID: { type: String, required: true },
    productID: { type: String, required: true ,ref:'cafeteria'},
    NumofItems: { type: Number, required: true },
    customDesc: { type: String, required: true },
    date:{type:Date , default:Date.now},
    paid:{type:Boolean,default:false},
    place:{type:String,required:true},
    status:{type:String,default:"notSeen"}
});

const CofeRequest = mongoose.model('cafeteriaRequests',cofeRequestSchema);
module.exports = CofeRequest;