const express = require('express');
const router = express.Router();
const services = require('../services/Post');
var multer  = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().getMilliseconds() + file.originalname)
    }
})

var upload = multer({storage : storage});

router.route('/')
    .post(upload.single('productImage'),services.postAd)
    

module.exports = router;