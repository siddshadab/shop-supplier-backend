const express = require('express');
const router = express.Router();
const AdPost = require('../models/AdPost');

router.get('/ad/:id', function(req, res, next){
    
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
})

module.exports = router;