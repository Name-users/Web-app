const db_helper = require("./db_helper");
const fs = require("fs");


function create_exception(code, message) {
    let err = new Error(message);
    err.status = code;
    return err;
}

// снимает бронь со столика
exports.post_open_table = [
    function (req, res, next) {
        if (!db_helper.existFile('./public/database/tables', req.params.number) || !req.params.number.match(/^\d+$/)) {
            return next(create_exception(400, `Ошибка ввода!`))
        }
        let path = `./public/database/tables/${req.params.number}.json`
        let table = db_helper.getObjectByPath(path)
        if (!table.status) {
            table.owner = ""
            table.status = true
            table.time = 'закрытия'
            db_helper.writeObject(path, table)
            next()
        }
        else {
            return next(create_exception(400, 'Столик не забронирован!'))
        }
    },
    function (req, res, next) {
        res.redirect(`/admin/tables/${req.params.number}`)
    }
]

// создаем столик
exports.post_add_table = [
    function (req, res, next) {
        if (db_helper.existFile('./public/database/tables', req.body.number)  || !req.body.number.match(/^\d+$/)) {
            return next(create_exception(400, `Ошибка ввода!`))
        }
        let path = `./public/database/tables/${req.body.number}.json`
        let table = {
            number: req.body.number,
            status: true,
            description: req.body.description,
            owner: "",
            time: 'закрытия'
        }
        db_helper.writeObject(path, table)
        next()
    },
    function (req, res, next) {
        res.redirect(`/admin/tables/${req.body.number}`)
    }
]

// удаляем столик
exports.post_delete_table = [
    function (req, res, next) {
        if (!db_helper.existFile('./public/database/tables', req.params.number)  || !req.params.number.match(/^\d+$/)) {
            return next(create_exception(400, `Ошибка ввода!`))
        }
        let path = `./public/database/tables/${req.params.number}.json`
        fs.unlinkSync(path)
        next()
    },
    function (req, res, next) {
        res.redirect('/admin/tables')
    }
]

// добавим новый тип меню
exports.post_add_type_menu = [
    function (req, res, next) {
        if (db_helper.existFile('./public/database/menu', req.body.type) || req.body.type.length < 3) {
            return next(create_exception(400, `Ошибка ввода!`))
        }
        let path = `./public/database/menu/${req.body.type}`
        fs.mkdir(path, err => {
            if (err) return next(err)
            next()
        })
    },
    function (req, res, next) {
        res.redirect(`/admin/menu/${req.body.type}`)
    }
];

// удалим тип меню
exports.post_delete_type_menu = [
    function (req, res, next) {
        if (!db_helper.existFile('./public/database/menu/', req.params.type) ||
                db_helper.getElementsFromDir(`./public/database/menu/${req.params.type}`).length !== 0) {
            return next(create_exception(400, `Ошибка ввода!`))
        }
        db_helper.deleteFolder(`./public/database/menu/${req.params.type}`)
        next()
    },
    function (req, res, next) {
        res.redirect('/admin/menu')
    }
]

// страница с редактирование позиции меню (еды)
exports.get_menu_type_update = function (req, res, next) {
    if (!db_helper.existFile(`./public/database/menu/${req.params.type}/`, req.params.name)) {
        return next(create_exception(400, `Ошибка ввода!`))
    }
    let food = db_helper.getObjectByPath(`./public/database/menu/${req.params.type}/${req.params.name}.json`)
    res.render('food_update', {
        title: 'The Krusty Krab',
        name: food.name,
        path: food.name,
        l2: 'Описание',
        n2: 'description',
        i2: food.description,
        l3: 'Состав',
        n3: 'composition',
        i3: food.composition//.toString()
    })
}

// страница с редактированием сотрудника
exports.get_staff_type_update = function (req, res, next) {
    if (!db_helper.existFile(`./public/database/staff/`, req.params.name)) {
        return next(create_exception(400, `Ошибка ввода!`))
    }
    let el = db_helper.getObjectByPath(`./public/database/staff/${req.params.name}.json`)
    res.render('food_update', {
        title: 'The Krusty Krab',
        name: el.name,
        path: el.name,
        l2: 'Должность',
        n2: 'post',
        i2: el.post,
        l3: 'О себе',
        n3: 'self',
        i3: el.self
    })
}

// форма создании позиции в меню (страница)
exports.get_menu_type_add = function (req, res, next) {
    res.render('food_update', {
        title: 'The Krusty Krab',
        name: '',
        path: 'add',
        l2: 'Описание',
        n2: 'description',
        i2: '',
        l3: 'Состав',
        n3: 'composition',
        i3: ''
    })
}

// форма создания сотрудника
exports.get_staff_type_add = function (req, res, next) {
    res.render('food_update', {
        title: 'The Krusty Krab',
        name: '',
        path: 'add',
        l2: 'Должность',
        n2: 'post',
        i2: '',
        l3: 'О себе',
        n3: 'self',
        i3: ''
    })
}

// удалить позицию в меню
exports.post_menu_type_delete = [
    function (req, res, next) {
        let path = `./public/database/menu/${req.params.type}/${req.params.name}.json`
        if (db_helper.existFile(`./public/database/menu/${req.params.type}`, req.params.name)) {
            let el = db_helper.getObjectByPath(path)
            if (el.image !== '/images/default.webp')
                db_helper.deleteFile(`./public${el.image}`)
            db_helper.deleteFile(path)
            next()
        }
        else
            return next(create_exception(400, `Ошибка ввода!`))
    },
    function (req, res, next) {
        res.redirect('/admin/menu')
    }
]

// удалить анкету сотрудника
exports.post_staff_type_delete = [
    function (req, res, next) {
        let path = `./public/database/staff/${req.params.name}.json`
        if (db_helper.existFile('./public/database/staff/', req.params.name)) {
            let el = db_helper.getObjectByPath(path)
            if (el.image !== '/images/default.webp')
                db_helper.deleteFile('./public' + el.image)
            db_helper.deleteFile(path)
            next()
        }
        else
            return next(create_exception(400, `Ошибка ввода!`));
    },
    function (req, res, next) {
        res.redirect('/admin/staff')
    }
]

// обновить позицию в меню
exports.post_menu_type_update = [
    function (req, res, next) {
        let image_path = '/images/default.webp'
        if (req.file && req.file.filename)
            image_path = `/images/menu/${req.file.filename}`
        let food = {
            name: req.body.name,
            description: req.body.description,
            composition: req.body.composition,
            image: image_path
        }
        let path = './public/database/menu/' + req.params.type + '/' + food.name + '.json'
        if (db_helper.existFile('./public/database/menu/' + req.params.type, food.name)) {
            let el = db_helper.getObjectByPath(path)
            if (el.image !== '/images/default.webp')
                db_helper.deleteFile('./public' + el.image)
        }
        db_helper.writeObject(path, food)
        next()
    },
    function (req, res, next) {
        res.redirect(`/admin/menu/${req.params.type}`)
    }
]

// обновить анкету сотрудника
exports.post_staff_type_update = [
    function (req, res, next) {
        let image_path = '/images/default.webp'
        if (req.file && req.file.filename)
            image_path = `/images/staff/${req.file.filename}`
        let el = {
            name: req.body.name,
            post: req.body.post,
            self: req.body.self,
            image: image_path
        }
        let path = `./public/database/staff/${el.name}.json`
        if (db_helper.existFile('./public/database/staff/', el.name)) {
            let el_ = db_helper.getObjectByPath(path)
            if (el_.image !== '/images/default.webp')
                db_helper.deleteFile('./public' + el_.image)
        }
        db_helper.writeObject(path, el)
        next()
    },
    function (req, res, next) {
        res.redirect('/admin/staff')
    }
]