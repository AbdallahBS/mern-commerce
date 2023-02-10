const express = require('express');
const { requireSignin, adminMiddleware } = require('../command-middleware');
const {addHistory, getHistoryD,getHistoryN, addHistoryP} = require('../controller/history')
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

router.post('/history/add',upload.array('packImage'),addHistory);
router.post('/historyP/add',upload.array('packImage'),addHistoryP);
router.post('/history/getDay',upload.array('packImage'),getHistoryD);
router.post('/history/getN',upload.array('packImage'),getHistoryN);


//router.get('/category/getcategory',getCategorires)
module.exports=router;