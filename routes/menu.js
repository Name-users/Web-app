const express = require('express');
const router = express.Router();
const menu = require('../controllers/menu');


router.get('/', menu.get(false));
router.get('/:type', menu.get_by_type(false));
module.exports = router;