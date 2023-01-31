const Cart = require('../models/cart');
const product = require('../models/product');
const user = require('../models/user');
exports.addItemToCart = (req ,res)=>{
    
    Cart.findOne({user: req.user._id})
    
    .exec((error,cart)=>{
        if(error) return res.status(400).json({error});
        if(req.user.role=="user"){
            
            if(cart){
         
            
          
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find( c => c.product == product);
                let condition ,update;
                if(item){
                  condition = {"user" : req.user._id, "cartItems.product" : product };
                  update =  {
                      "$set" :{
                          "cartItems.$" : {
                              ...req.body.cartItems,
                          price :req.body.cartItems.price * req.body.cartItems.quantity + item.price,
                          quantity :  item.quantity + req.body.cartItems.quantity }
                      }
                     }
                }else{
                  condition = {user : req.user._id};
                  update =  {
                      "$push" :{
                          "cartItems" : {
                              ...req.body.cartItems,
                          price :req.body.cartItems.quantity*req.body.cartItems.price}
                      }
                     }
                }
                Cart.findOneAndUpdate(condition , update)
                 .exec(((error,_cart)=>{
                  if(error) return res.status(400).json({error});
                  if(_cart){
                      return res.status(201).json({_cart});
                  }
              }))     
              }else{
                  const cart = new Cart({
                      user : req.user._id,
                      cartItems: [{
                          ...req.body.cartItems,
                          price : req.body.cartItems.price * req.body.cartItems.quantity
                      }]
                  })
                  cart.save(((error, cart)=>{
                      if(error) return res.status(400).json({error});
                      if(cart){
                          return res.status(201).json({cart});
                      }
                  }))
              }
        }
        if(req.user.role ==="dawarji"){
            if(cart){
         
            
          
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find( c => c.product == product);
                let condition ,update;
                if(item){
                  condition = {"user" : req.user._id, "cartItems.product" : product };
                  update =  {
                      "$set" :{
                          "cartItems.$" : {
                              ...req.body.cartItems,
                          price :(req.body.cartItems.price * req.body.cartItems.quantity + item.price)*0.02,
                          quantity :  item.quantity + req.body.cartItems.quantity }
                      }
                     }
                }else{
                  condition = {user : req.user._id};
                  update =  {
                      "$push" :{
                          "cartItems" : {
                              ...req.body.cartItems,
                          price :(req.body.cartItems.quantity*req.body.cartItems.price)*0.02}
                      }
                     }
                }
                Cart.findOneAndUpdate(condition , update)
                 .exec(((error,_cart)=>{
                  if(error) return res.status(400).json({error});
                  if(_cart){
                      return res.status(201).json({_cart});
                  }
              }))     
              }else{
                  const cart = new Cart({
                      user : req.user._id,
                      cartItems: [{
                          ...req.body.cartItems,
                          price : (req.body.cartItems.price * req.body.cartItems.quantity)*0.02
                      }]
                  })
                  cart.save(((error, cart)=>{
                      if(error) return res.status(400).json({error});
                      if(cart){
                          return res.status(201).json({cart});
                      }
                  }))
              }
        }
       
    });




};