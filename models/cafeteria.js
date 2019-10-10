const mongoose = require('mongoose');

const cafeteriaSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    class:{type:String,required:true}
});

const Cafeteria = mongoose.model('cafeteria',cafeteriaSchema);
module.exports = Cafeteria;