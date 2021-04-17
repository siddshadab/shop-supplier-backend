const express = require('express');
const router = express.Router();
const AdPost = require('../models/AdPost');

exports.getAd = async function(req,res){
    AdPost.find({}, function(err, ads){
        if(err){
            res.send('Error has accured');
        }
        else{
            res.json(ads);
        }
    });
}

