
const Product = require('../models/product');
const product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const pack = require('../models/pack');
const History = require('../models/history-achat')
exports.createProduct = async( req , res )=>{
    
    //res.status(200).json({file : req.files , body : req.body});
    
    const {name,id, price ,  quantityp } = req.body;
    console.log(name,id,price,quantityp)
   productToUpdate= await Product.findOne({id:id})
   packToUpdate = await pack.findOne({id :id})
   if(productToUpdate){
    if(name){
        productToUpdate.name = name
    }
    if(price){
        productToUpdate.price = price
    }
    productToUpdate.quantityp = parseFloat(productToUpdate.quantityp) + parseFloat(quantityp)
    productToUpdate.save()
   }
   if(packToUpdate){
    if(quantityp){
    packToUpdate.quantity = parseInt(parseInt(productToUpdate.quantityp)/parseInt(packToUpdate.quantityP))

}
    if(price){
        packToUpdate.price_product=price
    }
    console.log("from1",packToUpdate.quantity,packToUpdate.quantityP)
    packToUpdate.save()       
}
    else{
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
}))}; 
};
exports.modfProduct=async(req,res)=>{
    const {name,id,price,quantityp} = req.body;
    console.log("it is running")
    productToUpdate= await Product.findOne({id:id})
    packToUpdate = await pack.findOne({id :id})
    if(productToUpdate){
        if(name){
            productToUpdate.name = name
        }
        if(price){
            productToUpdate.price = price
        }
        if(quantityp){
            productToUpdate.quantityp=quantityp
        }
      productToUpdate.save()
    }
    if(packToUpdate){
        packToUpdate.quantity = parseInt(parseInt(productToUpdate.quantityp)/parseInt(packToUpdate.quantityP))
        console.log(packToUpdate.quantity)
        if(name){
            packToUpdate.name = name
        }
        if(price){
            packToUpdate.price_product=price
            console.log(price)
        }
        packToUpdate.save()
    }
}
exports.dropproduct = async( req , res )=>{
    //res.status(200).json({file : req.files , body : req.body});
    await Product.deleteOne({id : req.body.id})
    await pack.deleteOne({id : req.body.id})
    await History.deleteOne({ id: req.body.id })
    console.log(req.body.id)
    
    return res.status(201).json({message : "pack deleted successfully"})
  
}

