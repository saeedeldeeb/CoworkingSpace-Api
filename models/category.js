const mongoose = require('mongoose');


const catSchema = new mongoose.Schema({
image:{type: String, required: true},
name:{type: String, required: true},
ref:{
    collection:{type:String ,required:true},
    class:{type:String,required:true}
}
});

const Category = mongoose.model('category',catSchema);
module.exports = Category;