const mongoose = require('mongoose');
const {Schema} = mongoose;


const itemsSchema = new Schema({
    name:String,
    description:String,
    imageUrl:String,
    price:String,
    category:String,
    discount:{type:String,default:"1"},
    createdAt:{type:Date,default:Date.now}
})

mongoose.model('items',itemsSchema);