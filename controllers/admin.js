const db_helper = require("./db_helper");
const fs = require("fs");


exports.post_open_table = [
    function (req, res, next) { // /tables/:number/open
        if (db_helper.getElementsFromDir('./public/database/tables').indexOf(req.params.number) === -1) {
            let err = new Error('Error when booking a table');
            err.status = 400;
            return next(err);
        }
        let path = './public/database/tables/' + req.params.number + '.json'
        let table = JSON.parse(fs.readFileSync(path).toString())
        if (!table.status) {
            table.owner = ""
            table.status = true
            fs.writeFileSync(path, JSON.stringify(table))
            next()
            // res
            //     .status(200)
            //     .contentType("text/plain")
            //     .end("The table is open successfully!");
        }
        else {
            let err = new Error('Table is not booked!');
            err.status = 400;
            return next(err);
        }
    },
    function (req, res, next) {
        res.redirect('/admin/tables/' + req.params.number)
    }
]
exports.post_add_table = [
    function (req, res, next) {
        if (db_helper.getElementsFromDir('./public/database/tables').indexOf(req.params.number) !== -1 || req.body.number.length < 1) {
            let err = new Error('Столик уже существует!');
            err.status = 400;
            return next(err);
        }
        let path = './public/database/tables/' + req.body.number + '.json'
        let table = {
            number: req.body.number,
            status: true,
            description: req.body.description,
            owner: ""
        }
        fs.writeFileSync(path, JSON.stringify(table))
        next()
        // res
        //     .status(200)
        //     .contentType("text/plain")
        //     .end("The table is create successfully!");
    },
    function (req, res, next) {
        res.redirect('/admin/tables')
    }
]
exports.post_delete_table = [
    function (req, res, next) {
        if (db_helper.getElementsFromDir('./public/database/tables').indexOf(req.params.number) === -1) {
            let err = new Error('Столик не существует!');
            err.status = 400;
            return next(err);
        }
        let path = './public/database/tables/' + req.params.number + '.json'
        fs.unlinkSync(path)
        next()
        // res
        //     .status(200)
        //     .contentType("text/plain")
        //     .end("The table is delete successfully!");
    },
    function (req, res, next) {
        res.redirect('/admin/tables')
    }
]

exports.post_add_type_menu = [
    function (req, res, next) {
        if (db_helper.getElementsFromDir('./public/database/menu').indexOf(req.body.type) !== -1 || req.body.type.length < 1) {
            let err = new Error('Категория уже существует!');
            err.status = 400;
            return next(err);
        }
        let path = './public/database/menu/' + req.body.type
        fs.mkdir(path, err => {
            if (err) return next(err)
            next()
        })
    },
    function (req, res, next) {
        res.redirect('/admin/menu')
    }
];

exports.post_delete_type_menu = [
    function (req, res, next) {
        if (db_helper.getElementsFromDir('./public/database/menu/' + req.params.type).length !== 0) { // FIXME: добавить проверку на существование каталога
            let err = new Error('Не удалось удалить категорию!');
            err.status = 400;
            return next(err);
        }
        fs.rmdirSync('./public/database/menu/' + req.params.type)
        next()
    },
    function (req, res, next) {
        res.redirect('/admin/menu')
    }
]

exports.get_menu_type_update = function (req, res, next) {
    let food = db_helper.getObjectByPath('./public/database/menu/' + req.params.type + '/' + req.params.name + '.json')
    res.render('food_update', {
        title: 'The Krusty Krab',
        name: food.name,
        path: food.name,
        l2: 'Description',
        i2: food.description,
        l3: 'Composition',
        i3: food.composition.toString()
    })
}

exports.get_staff_type_update = function (req, res, next) {
    let el = db_helper.getObjectByPath('./public/database/staff/' + req.params.name + '.json')
    res.render('food_update', {
        title: 'The Krusty Krab',
        name: el.name,
        path: el.name,
        l2: 'Post',
        i2: el.post,
        l3: 'Self',
        i3: el.self
    })
}

exports.get_menu_type_add = function (req, res, next) {
    res.render('food_update', {
        title: 'The Krusty Krab',
        name: '',
        path: 'add',
        l2: 'Description',
        i2: '',
        l3: 'Composition',
        i3: ''
    })
}

exports.get_staff_type_add = function (req, res, next) {
    res.render('food_update', {
        title: 'The Krusty Krab',
        name: '',
        path: 'add',
        l2: 'Post',
        i2: '',
        l3: 'Self',
        i3: ''
    })
}

exports.post_menu_type_delete = [
    function (req, res, next) {
        let path = './public/database/menu/' + req.params.type + '/' + req.params.name + '.json'
        if (db_helper.existFile('./public/database/menu/' + req.params.type, req.params.name)) {
            let el = db_helper.getObjectByPath(path)
            db_helper.deleteFile('./public' + el.image)
            db_helper.deleteFile(path)
            next()
            // res
            //     .status(200)
            //     .contentType("text/plain")
            //     .end("The element is delete successfully!");
        }
        else
            res
                .status(400)
                .contentType("text/plain")
                .end("Удалить не удалось!");
    },
    function (req, res, next) {
        res.redirect('/admin/menu')
    }
]

exports.post_staff_type_delete = [
    function (req, res, next) {
        let path = './public/database/staff/' + req.params.name + '.json'
        if (db_helper.existFile('./public/database/staff/', req.params.name)) {
            let el = db_helper.getObjectByPath(path)
            db_helper.deleteFile('./public' + el.image)
            db_helper.deleteFile(path)
            next()
            // res
            //     .status(200)
            //     .contentType("text/plain")
            //     .end("The element is delete successfully!");
        }
        else
            res
                .status(400)
                .contentType("text/plain")
                .end("Удалить не удалось!");
    },
    function (req, res, next) {
        res.redirect('/admin/staff')
    }
]

exports.post_menu_type_update = [
    function (req, res, next) {
        let food = {
            name: req.body.name,
            description: req.body.description,
            composition: req.body.composition.split(','),
            image: '/images/menu/' + req.file.filename
        }
        let filedata = req.file;
        //console.log(filedata);
        if (!filedata){
            let err = new Error('Ошибка загрузки изображения!');
            err.status = 400;
            return next(err);
        }
        let path = './public/database/menu/' + req.params.type + '/' + food.name + '.json'
        if (db_helper.existFile('./public/database/menu/' + req.params.type, food.name))
            db_helper.deleteFile('./public' + db_helper.getObjectByPath(path).image)

        fs.writeFileSync(path, JSON.stringify(food))
        next()
        // res
        //     .status(200)
        //     .contentType("text/plain")
        //     .end("The successfully!");
    },
    function (req, res, next) {
        res.redirect('/admin/menu/' + req.params.type)
    }
]

exports.post_staff_type_update = [
    function (req, res, next) {
        let el = {
            name: req.body.name,
            post: req.body.post,
            self: req.body.self,
            image: '/images/staff/' + req.file.filename
        }
        let filedata = req.file;
        //console.log(filedata);
        if (!filedata){
            let err = new Error('Ошибка загрузки изображения!');
            err.status = 400;
            return next(err);
        }
        let path = './public/database/staff/' + el.name + '.json'
        if (db_helper.existFile('./public/database/staff/', el.name))
            db_helper.deleteFile('./public' + db_helper.getObjectByPath(path).image)

        fs.writeFileSync(path, JSON.stringify(el))
        next()
        // res
        //     .status(200)
        //     .contentType("text/plain")
        //     .end("The successfully!");
    },
    function (req, res, next) {
        res.redirect('/admin/staff')
    }
]