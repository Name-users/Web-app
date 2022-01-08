var express = require('express');
var router = express.Router();
const admin = require('../controllers/admin');
const tables = require('../controllers/tables');
const index = require('../controllers/index');
const menu = require("../controllers/menu");

router.get('/', index.get(true));
router.get('/menu', menu.get(true));
router.post('/menu/update', admin.post_add_type_menu);
router.get('/menu/:type', menu.get_by_type(true));
router.get('/tables', tables.get(true));
router.post('/tables/update', admin.post_add_table)
router.get('/tables/:number', tables.get_by_number(true));
router.post('/tables/:number', tables.post_by_number(true));
router.post('/tables/:number/open', admin.post_open_table);
router.post('/tables/:number/delete', admin.post_delete_table);


module.exports = router;