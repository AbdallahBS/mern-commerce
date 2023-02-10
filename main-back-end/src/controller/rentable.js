const Product = require('../models/product');
const History = require('../models/history')
const history = require('../models/history')
const pack = require('../models/pack');
const product = require('../models/product');
const historyachat = require('../models/history-achat')
exports.getHistoryD = async(req,res)=>{
   const {time}=req.body
   const data = await history.find({createdAt : {$gte:new Date(req.body.time),$lt:new Date()}})
     return res.status(200).json({data})
}
exports.getRentable = async(req,res)=>{
     console.log(req.body.time1)
     console.log(req.body.time2)
     if(req.body.id!=0){
          console.log('ni im here',req.body.id)
          const data1 = await history.find({createdAt : {$gte:new Date(req.body.time1),$lt:new Date(req.body.time2)},id :req.body.id})
          const data2 = await historyachat.find({createdAt : {$gte:new Date(req.body.time1),$lt:new Date(req.body.time2)},id :req.body.id})
          if(data1 && data2){
            let total_vente=0;
            let nb_vente = 0;
            let total_achat=0;
            for(let prix of data1){
                 nb_vente=nb_vente+parseInt(prix.quantity)
                 total_vente=total_vente+ parseInt(prix.price_totale);
  
            } 
            for(let prix of data2){
                 total_achat=total_achat + parseInt(prix.price_achat); 
            }
       
               return res.status(200).json({data1,data2,nb_vente,total_achat,total_vente})
          }
          else{
               return res.status(200).json({message : 'something wrong'})
          }    
     }    
     else {
          console.log('im here') 
          console.log(req.body.id)
          const data1 = await history.find({createdAt : {$gte:new Date(req.body.time1),$lt:new Date(req.body.time2)}})
          const data2 = await historyachat.find({createdAt : {$gte:new Date(req.body.time1),$lt:new Date(req.body.time2)}})
        
     if(data1 && data2){
        let total_vente=0;
          let nb_vente = 0;
          let total_achat=0;
          for(let prix of data1){
               nb_vente=nb_vente+parseInt(prix.quantity)
               total_vente=total_vente+ parseInt(prix.price_totale);
          }
          for(let prix of data2){
               total_achat=total_achat + parseInt(prix.price_achat); 
          }
          console.log(total_vente,total_achat,nb_vente)
          return res.status(200).json({data1,data2,nb_vente,total_achat,total_vente})
     }
     else{
          return res.status(200).json({message : 'something wrong'})
     }    
  }    
}   
  
       