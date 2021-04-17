const express = require('express');
const router = express.Router();
const services = require('../services/Post');

router.route('/')
    .post(services.postAd)


module.exports = router;