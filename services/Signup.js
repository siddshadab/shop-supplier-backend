const express = require('express');
const router = express.Router();
const User = require('../models/User');


exports.postSignUp = async function(req,res){

    const { body } = req;
    console.log('body', body);

    const {
        fname,
        lname,
        password
    } = body;

    let {
        email
    } = body;

    if(!fname){
        res.send({
            success: false,
            message: "Error: first name can't be blank"
        });
    }
    if(!lname){
        res.send({
            success: false,
            message: "Error: last name can't be blank"
        });
    }
    if(!email){
        res.send({
            success: false,
            message: "Error: email field can't be blank"
        });
    }
    if(!password){
        res.send({
            success: false,
            message: "Error: password field can't be blank"
        });
    }
    
    email = email.toLowerCase();

    // Steps
    // 1 Verify email doesn't exist
    // 2 save

    User.find({
        email:email
    }, (err, previousUsers) => {
        if(err){
             res.send({
                success: false,
                message: "Error: Server Error"
            });
        }else if (previousUsers.length > 0 ){
             res.send({
                success: false,
                message: "Error: Email already exist"
            });
        }

        // Save the new user

        const newUser = new User();
        newUser.email = email;
        newUser.firstName = fname;
        newUser.lastName = lname;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if(err){
                 res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            }
            else if(user){
                 res.send({
                    success: true,
                    message: "You are welcome, Signed Up"
                });
            }
        });
    });
}

