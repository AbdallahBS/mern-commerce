const express = require('express');
const app= express();
const env=require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
//routes
const authRoutes= require('./routes/auth');
const adminRoutes= require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const packRoutes = require('./routes/pack');
const historyRoutes = require('./routes/history');
const initialDataRoutes = require('./routes/admin/initialData');


// evirement variablre or constance 
env.config();
//mongodb connection 
//mongodb+srv://root:<password>@cluster0.dyknsta.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dyknsta.mongodb.net/${process.env.MONGO_DB_DATABSE}?retryWrites=true&w=majority` ,
{
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then (()=>{
    console.log('Data base connected');
});
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api',authRoutes);
app.use('/api',packRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',historyRoutes);
app.use('/api',initialDataRoutes);
app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT);
});