const mongoose = require('mongoose');
const packSchema= new mongoose.Schema({  
    name : {
        type : String,
        required : true,
        trim : true
    },
    id : {
        type : String,
        required : true,
    },
    price_achat : {
        type : String,
        required : true
    },
    price_vente : {
        type : String,
        required : true
    },
    
    price_product : {
        type : String,
        required : true
    },
    description : {
        type : String,
        trim : true
    },
    quantity : {
        type : String,
        required : true
    },
    quantityP : {
        type : String,
        required : true
    },
    productPicture: [
        { img :  {type : String} }
    ],
    category : {
        type : String,
        required : true,
        trim : true
    },
    updatedAt : Date, 
},{timestamps : true});
module.exports = mongoose.model('Pack',packSchema);