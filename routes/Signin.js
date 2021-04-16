const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserSession = require('../models/UserSession');

 
// router.get('/signin', function(req, res){
//     res.send("This is signin page this is wonderful");
// })

router.post('/signin', function(req, res, next){
    // const { body } = req;

    // const {
    //     password
    // } = body;

    // let {
    //     email
    // } = body;


    if(!req.body.email){
        return res.send({
            success: false,
            message: "Error: email field can't be blank"
        });
    }
    if(!req.body.password){
        return res.send({
            success: false,
            message: "Error: password field can't be blank"
        });
    }

    email = req.body.email.toLowerCase();

    User.find({
        email: req.body.email
    },(err, users)=>{
        // console.log(users);
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        if(users.length != 1){
            // console.log(users);
            // console.log(users.length);
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }

        const user = users[0];
        if(!user.validPassword(req.body.password)){
            return res.send({
                success: false,
                message: 'Error: Invalid Password'
            });
        }

        // authentic user

        const userSession = new UserSession()
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            else if(doc){
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                });
            }
        });

    });
});

module.exports = router;