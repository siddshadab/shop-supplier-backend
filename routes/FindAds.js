const express = require('express');
const router = express.Router();
const services = require('../services/FindAds');

router.route('/')
    .get(services.getAd)


module.exports = router;