
const Product = require('../models/product');

const shortid = require('shortid');
const slugify = require('slugify');
const pack = require('../models/pack');
exports.createProduct = ( req , res )=>{
    
    //res.status(200).json({file : req.files , body : req.body});
    const {name,id, price ,  quantityp } = req.body;
    console.log(name,id,price,quantityp)
    
    
    const product = new Product({
        
        id,
        name,
        price ,
        quantityp,
    });

    product.save(((error , product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            res.status(201).json({ product });
            }
}));
 
    
};
exports.dropproduct = async( req , res )=>{
    
    //res.status(200).json({file : req.files , body : req.body});
    
  
    await Product.deleteOne({id : req.body.id})
    console.log(req.body.id)
    
    return res.status(201).json({message : "pack deleted successfully"})
  
}

