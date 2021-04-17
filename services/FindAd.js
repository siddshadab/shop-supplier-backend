const express = require('express');
const router = express.Router();
const AdPost = require('../models/AdPost');


exports.getAdPostOnId = async function(req,res){

    AdPost.findOne({
        _id: req.params.id
    })
    .exec(function(err, ad){
        if(err){
            console.log("Error accur with getting one add");
            return;
        }
        else{
            console.log(ad);
            res.json(ad);
        }
    })
}


