const express = require('express');
const router = express.Router();
const self = require('../controllers/self');

router.get('/', self.get(false));

module.exports = router;