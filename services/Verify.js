const express = require('express');
const router = express.Router();
const UserSession = require('../models/UserSession');


exports.getVerify = async function(req,res){
    const {query} = req;
    const {token} = query;
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions)=> {
        if(err){
            return res.send({
                success: false,
                message: "Error: server error"
            })
        }
        else if (sessions.length !== 1) {
            return res.send({
                success: false,
                message: "Error: Invalid"
            });
        }
        else{
            return res.send({
                success: true,
                message: "Good"
            });
        }
    });
}





