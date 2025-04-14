const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'data/upload');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
})
const upload = multer({storage});
router.post('/upload',upload.single('file'),(req,res,next)=>{
    const {file} = req;
    res.send({
        code:'00000',
        file:{url:file.path.split('data')[1]},
        success:true
    })
})

module.exports = router;