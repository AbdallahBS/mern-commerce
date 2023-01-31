const mongoose = require('mongoose');
const productSchema= new mongoose.Schema({
    id : {
        type : String,
        required : true,
        trim :true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : String,
        
    },
    quantityp : {
        type : String,
        
    },
  
    productPicture: [
        { img :  {type : String} }
    ],

    category : {type : String},
   
    updatedAt : Date, 


},{timestamps : true});
module.exports = mongoose.model('Product',productSchema);