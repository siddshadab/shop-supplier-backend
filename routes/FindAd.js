const express = require('express');
const router = express.Router();
const AdPost = require('../models/AdPost');
const services = require('../services/FindAd');


router.route('/')
    .get(services.getAdPostOnId)
    

module.exports = router;