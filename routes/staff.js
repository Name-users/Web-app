const express = require('express');
const router = express.Router();
const staff = require('../controllers/staff')


router.get('/', staff.get(false));
module.exports = router;