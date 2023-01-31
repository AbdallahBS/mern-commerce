
const Product = require('../models/product');
const History = require('../models/history')
const history = require('../models/history')
const pack = require('../models/pack');
const product = require('../models/product');
exports.addHistory = async(req,res)=>{
    const {name,id,quantity,price_totale} = req.body
    
    
   const history = new History({
        name,
        id,
        quantity,
        price_totale,
   });
   productToUpdate = await product.findOne({id :id})
   if(productToUpdate){
     console.log('i got it')
     productToUpdate.quantityp=parseFloat(productToUpdate.quantityp)-parseFloat(quantity)
     productToUpdate.save()
     packToUpdate = await pack.findOne({id :id})
     if(packToUpdate){
          const x = parseInt(productToUpdate.quantityp)/parseInt(packToUpdate.quantityP)
          console.log(productToUpdate.quantityp,packToUpdate.quantityP,x,parseInt(x))
          if(parseInt(x)>=x){
               packToUpdate.quantity=parseInt(x)
               packToUpdate.save()
          }
     }
   } 
   history.save(((error,history)=>{
    
   if(history){
     
    return res.status(201).json({message : 'saved ! !'})
   }
   else{
        return res.status(400).json({message : error})
   }
   
}
            
));} 
exports.addHistoryP = async(req,res)=>{
     const {name,id,quantity,price_totale,remise} = req.body
     
     
    const history = new History({
         name,
         id,
         quantity,
         price_totale,
         remise,
    });
    packToUpdate = await pack.findOne({id :id})
    if(packToUpdate){
      console.log('i got it')
      packToUpdate.quantity=parseInt(packToUpdate.quantity)-parseInt(quantity)
      packToUpdate.save()
      product = await pack.findOne({id :id})
      if(productToUpdate){
           productToUpdate.quantityp=parseInt(packToUpdate.quantity)*parseInt(packToUpdate.quantityP)
           console.log(productToUpdate.quantityp,packToUpdate.quantityP,x,parseInt(x))
           if(parseInt(x)>=x){
                packToUpdate.quantity=parseInt(x)
                packToUpdate.save()
           }
      }
    } 
    history.save(((error,history)=>{
     
    if(history){
      
     return res.status(201).json({message : 'saved ! !'})
    }
    else{
         return res.status(400).json({message : error})
    }
    
 }
             
 ));} 
exports.getHistoryD = async(req,res)=>{
   const {time}=req.body
   
   const data = await history.find({createdAt : {$gte:new Date(req.body.time),$lt:new Date()}})
     return res.status(200).json({data})
}
exports.getHistoryN = async(req,res)=>{
     console.log(req.body.time1)
     console.log(req.body.time2)
     const data = await history.find({createdAt : {$gte:new Date(req.body.time1),$lt:new Date(req.body.time2)},id :req.body.id})
     if(data){
          return res.status(200).json({data})
     }
     else{
          return res.status(200).json({message : 'something wrong'})

     } 
    
          
  }   
  
       