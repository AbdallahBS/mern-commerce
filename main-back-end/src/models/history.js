const mongoose = require('mongoose');
const historySchema= new mongoose.Schema({
 
  
    name : {
        type : String,
        required : true,
        trim : true
    },
    id : {
        type : String,
        required : true,
       
    },
    quantity : {
        type : String,
        required : true
    },
    price_totale : {
        type : String,
        required : true
    },
    remise :{
        type : String,
    },
 
  
    updatedAt : Date, 


},{timestamps : true,date :new Date()},
);
module.exports = mongoose.model('History',historySchema);