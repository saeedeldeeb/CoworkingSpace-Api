const mongoose = require('mongoose');

const rentRequestSchema = new mongoose.Schema({
    demanderID: { type: String, required: true },
    productID: { type: String, required: true, ref: 'forRent' },
    NumofHours: { type: Number, required: true },
    NumofItems: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paid: { type: Boolean, default: false },
    place: { type: String, required: true },
    status: { type: String, default: "notSeen" }
});

const RentRequest = mongoose.model('rentRequests', rentRequestSchema);
module.exports = RentRequest;