const express = require('express');
const router = express.Router();
const services = require('../services/Signin');

 
router.route('/')
    .post(services.postSignIn)

module.exports = router;