const express = require('express');
const router = express.Router();
const tables = require('../controllers/tables');

router.get('/', tables.get);
router.get('/:number', tables.get_by_number);
router.post('/:number', tables.post_by_number);
module.exports = router;