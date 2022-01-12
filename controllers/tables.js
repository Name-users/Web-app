const fs = require("fs");
const db_helper = require('../controllers/db_helper');


exports.get = function(is_admin) {
    return function(req, res, next) {
        let tables = db_helper.getListObjects('./public/database/tables/');
        let numbers = []
        for (let index in tables)
            numbers.push(tables[index].number)
        res.render('tables', {
            title: 'The Krusty Krab',
            page: 'Столики',
            description: 'Здесь вы можете забронировать столик',
            tables: numbers,
            is_admin: is_admin
        })
    };
};

exports.get_by_number = function(is_admin) {
    return function (req, res, next) {
        if (db_helper.getElementsFromDir('./public/database/tables').indexOf(req.params.number) === -1) {
            let err = new Error('Столик не найден');
            err.status = 404;
            return next(err);
        }
        let table = JSON.parse(fs.readFileSync('./public/database/tables/' + req.params.number + '.json').toString())
        res.render('table', {
            title: 'The Krusty Krab',
            number: table.number,
            table_status: table.status,
            description: table.description,
            is_admin: is_admin
        })
    };
};

exports.post_by_number = function(is_admin) {
    return function (req, res, next) {
        if (db_helper.getElementsFromDir('./public/database/tables').indexOf(req.params.number) === -1 || req.body.name.length < 7) {
            let err = new Error('Ошибка при бронировании столика');
            err.status = 400;
            return next(err);
        }
        let path = './public/database/tables/' + req.params.number + '.json'
        let table = JSON.parse(fs.readFileSync(path).toString())
        if (table.status) {
            table.owner = req.body.name
            table.status = false
            fs.writeFileSync(path, JSON.stringify(table))
            if (is_admin)
                res.redirect('/admin/tables/' + req.params.number)
            else
                res.redirect('/tables/' + req.params.number)
        } else {
            let err = new Error('Столик забронирован');
            err.status = 400;
            return next(err);
        }
    };
};