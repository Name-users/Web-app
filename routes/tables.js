const express = require('express');
const router = express.Router();
const tables = require('../controllers/tables');

router.get('/', tables.get(false));
router.get('/:number', tables.get_by_number(false));
router.post('/:number', tables.post_by_number(false));
module.exports = router;