const mongoose = require('mongoose');
const categorySchema= new mongoose.Schema({
    name : {type : mongoose.Schema.Types.ObjectId, ref : "Pack" , required : true},
    slug : {
        type : String,
        required : true,
        unique: true
    },
    categoryImage : {
        type : String
    },
    parentId: {
        type:String
    }

},{timestamps : true});
module.exports = mongoose.model('Category',categorySchema);