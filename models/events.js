const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Date,required:true},
    description:String,
    numOfGuests:Number
});

const Events = mongoose.model('events',eventSchema);
module.exports = Events;