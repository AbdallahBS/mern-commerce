const express = require('express');
const { requireSignin, adminMiddleware } = require('../command-middleware');
const {createProduct, dropproduct} = require('../controller/product');
const router = express.Router();
//const {} = require('../controller/category');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const product = require('../models/product');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate()+ '-' +file.originalname)
    }
  })
const upload = multer({storage});
router.post('/product/create',upload.array('product picture'),createProduct);
router.post('/product/drop',upload.array('product picture'),dropproduct);
//router.get('/category/getcategory',getCategorires)
module.exports=router;