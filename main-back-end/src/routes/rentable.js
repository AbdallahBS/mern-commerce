const express = require('express');
const {getRentable} = require('../controller/rentable');
const router = express.Router();
//const {} = require('../controller/category');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate()+ '-' +file.originalname)
    }
  })
const upload = multer({storage});

router.post('/rentable/get',upload.array('product picture'),getRentable);
//router.get('/category/getcategory',getCategorires)
module.exports=router;