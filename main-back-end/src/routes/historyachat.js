const express = require('express');
const { requireSignin, adminMiddleware } = require('../command-middleware');
const {getHistoryAchat} = require('../controller/historyachat')
const multer = require('multer');
const router = express.Router();
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
router.post('/historyachat/get',upload.array('packImage'),getHistoryAchat);
module.exports=router;