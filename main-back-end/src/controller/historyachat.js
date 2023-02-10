const historyachats = require('../models/history-achat')
exports.getHistoryAchat = async(req,res)=>{
     console.log(req.body.time1)
     console.log(req.body.time2)
     if(req.body.id!=0){
          console.log('ni im here',req.body.id)
          const data = await historyachats.find({createdAt : {$gte:new Date(req.body.time1),$lt:new Date(req.body.time2)},id :req.body.id})
          if(data){
               return res.status(200).json({data})
          }
          else{
               return res.status(200).json({message : 'something wrong'})
          }    
     }    
     else {
          console.log('im here')
          const data = await historyachats.find({createdAt : {$gte:new Date(req.body.time1),$lt:new Date(req.body.time2)}})
          
     if(data){
          return res.status(200).json({data})
     }
     else{
          return res.status(200).json({message : 'something wrong'})
     }    }
     
      
  }   
  
       