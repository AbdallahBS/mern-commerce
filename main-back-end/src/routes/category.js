const express = require('express');
const { requireSignin, adminMiddleware } = require('../command-middleware');
const router = express.Router();
const { addCategory , getCategorires} = require('../controller/category');
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
router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),addCategory);
router.get('/category/getcategory',getCategorires)
module.exports=router;