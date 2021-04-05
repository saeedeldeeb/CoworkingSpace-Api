const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    info: { type: String, required: true },
    price: { type: Number, required: true },
    availabilityInStock: { type: Number, required: true },
    rentID: { type: String, required: true }
});

const ForRent = mongoose.model('forRent',rentSchema);
module.exports = ForRent;