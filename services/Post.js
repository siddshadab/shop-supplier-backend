const express = require('express');
const router = express.Router();
const AdPost = require('../models/AdPost');
var multer  = require('multer');

 // limits:{fileSize: 1024 * 1024 * 5}


exports.postAd = async function(req,res){

console.log(req.file);
    console.log(req.body);


    if(!req.body.title){
        return res.send({
            success: false,
            message: 'Error: title field connot be blank'
        });
    }
    if(!req.body.category){
        return res.send({
            success: false,
            message: 'Error: category field cannot be blank'
        });
    }
    if(!req.body.model){
        return res.send({
            success: false,
            message: 'Error: model fiels cannot be blank'
        });
    }
    if(!req.body.condition){
        return res.send({
            success: false,
            message: "Error: condition field cannot be blank"
        });
    }
    if(!req.body.price){
        return res.send({
            success: false,
            message: 'Error: price field cannot be blank'
        });
    }
    if(!req.body.description){
        return res.send({
            success: false,
            message: 'Error: description field cannot be blank'
        });
    }
    if(!req.body.sellerName){
        return res.send({
            success: false,
            message: 'Error: Seller name cannot be blank'
        });
    }
    if(!req.body.soldCity){
        return res.send({
            success: false,
            message: 'Error: city name cannot be blank'
        });
    }
    if(!req.body.phoneNum){
        return res.send({
            success: false,
            message: 'Error: Phone number cannot be blank'
        });
    }


    // create new post
    
    const newPost = new AdPost();
    newPost.title = req.body.title;
    newPost.category = req.body.category;
    newPost.model = req.body.model;
    newPost.condition = req.body.condition;
    newPost.price = req.body.price;
    newPost.description = req.body.description;
    newPost.sellerName = req.body.sellerName;
    newPost.soldCity = req.body.soldCity;
    newPost.phoneNum = req.body.phoneNum;
    newPost.productImage = req.file.path;
    newPost.save((err, post) => {
        if(err){
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        else if(post){
            return res.send({
                success: true,
                message: 'Your Ad is posted'
            });
        }
    });
}



