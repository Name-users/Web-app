const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const tables = require('../controllers/tables');
const index = require('../controllers/index');
const menu = require("../controllers/menu");
const staff = require("../controllers/staff");
const multer = require("multer");
//FIXME: на пути где стоит пост поставить get?

router.get('/', index.get(true));

router.get('/menu', menu.get(true));
router.post('/menu/update', admin.post_add_type_menu);
router.get('/menu/:type', menu.get_by_type(true));
router.post('/menu/:type/delete', admin.post_delete_type_menu);
router.get('/menu/:type/add', admin.get_menu_type_add)
router.post('/menu/:type/:name/update',
    multer({dest: "public/images/menu"}).single("filedata"),
    admin.post_menu_type_update
)
router.post('/menu/:type/:name/delete', admin.post_menu_type_delete)
router.get('/menu/:type/:name', admin.get_menu_type_update)

router.get('/tables', tables.get(true));
router.post('/tables/update', admin.post_add_table)
router.get('/tables/:number', tables.get_by_number(true));
router.post('/tables/:number', tables.post_by_number(true));
router.post('/tables/:number/open', admin.post_open_table);
router.post('/tables/:number/delete', admin.post_delete_table);

router.get('/staff', staff.get(true))
router.get('/staff/add', admin.get_staff_type_add)
router.get('/staff/:name', admin.get_staff_type_update)
router.post('/staff/:name/update',
    multer({dest: "public/images/staff"}).single("filedata"),
    admin.post_staff_type_update
)
router.post('/staff/:name/delete', admin.post_staff_type_delete)

router.get('/self', function(req, res, next) {
    res.render('self');
});


module.exports = router;