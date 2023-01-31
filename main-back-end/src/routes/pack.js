const express = require('express');
const { requireSignin, adminMiddleware } = require('../command-middleware');
const {createPack,updatePack,deletePack} = require('../controller/pack')
const multer = require('multer');
const router = express.Router();

//const {} = require('../controller/category');

const path = require('path');
const shortid = require('shortid');
const storage = multer.diskStorage({
    destination : function(req , file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename : function(req , file , cb){
        cb(null ,shortid.generate()+'-'+file.originalname)
    }
})
const upload = multer({storage})
router.post('/pack/create',upload.array('packImage'),createPack);
router.post('/pack/update',upload.array('packImage'),updatePack);
router.post('/pack/delete',upload.array('packImage'),deletePack);

//router.get('/category/getcategory',getCategorires)
module.exports=router;