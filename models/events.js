const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    image:{type:String,default:'eventDefault.png'},
    name:{type:String,required:true},
    date:{type:Number,required:true},
    description:{type:String,default:"No Description provided"},
    sponsor:{type:String,default:"No specific Sponsor"} ,
    numOfGuests:Number,
    guests:{type:Array,required:false}
});

const Events = mongoose.model('events',eventSchema);
module.exports = Events;