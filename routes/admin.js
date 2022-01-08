var express = require('express');
var router = express.Router();
const admin = require('../controllers/admin');
const tables = require('../controllers/tables');

router.get('/', function(req, res, next) {
    res.send('admin');
});
router.get('/tables', tables.get(true));
router.post('/tables/update', admin.post_add_table)
router.get('/tables/:number', tables.get_by_number(true));
router.post('/tables/:number', tables.post_by_number(true));
router.post('/tables/:number/open', admin.post_open_table);
router.post('/tables/:number/delete', admin.post_delete_table);


module.exports = router;