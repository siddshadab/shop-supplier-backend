const express = require('express');
const router = express.Router();
const UserSession = require('../models/UserSession');

exports.getLogout = async function(req,res){

    UserSession.findOneAndUpdate({_id:req.query.token, isDeleted:false}, {$set:{isDeleted:true}} , null, function(error, sessions){
        if(error){
             res.send({success: false, message: "Error: Server error"});
        }
             res.send({success: true, message: 'UserSession isDeleted to true'});
    });
}


