const Pack = require('../models/pack');
const Product = require('../models/product');
const shortid = require('shortid');
const pack = require('../models/pack');
const product = require('../models/product');
exports.createPack = async(req,res)=>{
    const {name,id,price,price_product,description,quantity,quantityP,category}= req.body
    packToUpdate = await pack.findOne({id :id})
    if(packToUpdate){
        console.log("yaaaaaaaaaaaaaaanpms")
        packToUpdate.price=price
        packToUpdate.price_product=price_product
        packToUpdate.quantity=parseInt(packToUpdate.quantity)+parseInt(quantity)
        packToUpdate.save();
        productToUpdate = await product.findOne({id :id})
        
        if(productToUpdate){
            productToUpdate.price=price_product
            productToUpdate.quantityp=parseInt(productToUpdate.quantityp)+(parseInt(quantity)*parseInt(quantityP))
            

            productToUpdate.save()
        }

    }
    else{

    let productPicture =[]
    if(req.files.length>0){
           productPicture = req.files.map(file =>{
                return {img :file.filename}
            })
    }

   const pack = new Pack({
        name,
        id,
        price,
        price_product,
        description,
        quantity,
        quantityP,
        productPicture,
        category,
        
   });
   const product = new Product({
    name,
    id,
    price :price_product,
   
    quantityp : quantity*quantityP,
    productPicture,
    category,
    
   })
  
   pack.save(((error,pack)=>{
    if(error) return res.status(400).json({error})
   if(pack){
    product.save(((error,pack)=>{
        if(error) return res.status(400).json({error})
       if(pack){
        return res.status(201).json({message : "product added successfuly"})
       }
       
    }
               
    ));
   }
   
}
           
));}

};
exports.updatePack = async (req,res)=>{
       const {id,price,name,price_product} = req.body;
       packToUpdate = await pack.findOne({id :id})
           if (packToUpdate){
            if(price){
                packToUpdate.price=price
            }
            if(name){
                packToUpdate.name=name
            }
            if(price_product){
                packToUpdate.price_product=price_product
                productToUpdate = await product.findOne({id :id})
                if(productToUpdate){
                    productToUpdate.price=price_product
                    productToUpdate.save()
                }
            }
            packToUpdate.save();
          
           }
           
}
exports.deletePack = async (req,res)=>{
    await pack.deleteOne({id : req.body.id})
    await product.deleteOne({id : req.body.id})
    return res.status(201).json({message : "pack deleted successfully"})
  
  } 