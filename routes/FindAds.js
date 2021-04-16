const express = require('express');
const router = express.Router();
const AdPost = require('../models/AdPost');

router.get('/ads', function(req, res, next){
    AdPost.find({}, function(err, ads){
        if(err){
            res.send('Error has accured');
        }
        else{
            res.json(ads);
        }
    });
});

module.exports = router;