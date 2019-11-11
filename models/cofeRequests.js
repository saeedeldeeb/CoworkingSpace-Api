const mongoose = require('mongoose');

const cofeRequestSchema = new mongoose.Schema({
    demanderID: { type: String, required: true },
    productID: { type: String, required: true },
    NumofItems: { type: Number, required: true },
    customDesc: { type: String, required: true },
    place:{type:String,required:true},
    status:{type:String,default:"notSeen"}
});

const CofeRequest = mongoose.model('cafeteriaRequests',cofeRequestSchema);
module.exports = CofeRequest;