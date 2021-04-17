const express = require('express');
const router = express.Router();
const UserSession = require('../models/UserSession');
const services = require('../services/Verify');

router.route('/')
    .get(services.getVerify)


module.exports = router;


