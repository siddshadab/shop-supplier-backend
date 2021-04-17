const express = require('express');
const router = express.Router();
const services = require('../services/Signup');


router.route('/')
    .post(services.postSignUp)

module.exports = router;