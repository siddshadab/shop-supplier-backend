const express = require('express');
const router = express.Router();
const services = require('../services/Logout');

router.route('/')
    .get(services.getLogout)

    module.exports = router;
