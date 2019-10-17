const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Number,required:true},
    description:String,
    numOfGuests:Number,
    guests:[{type:Array,required:true}]
});

const Events = mongoose.model('events',eventSchema);
module.exports = Events;