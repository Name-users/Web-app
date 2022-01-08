const db_helper = require("./db_helper");
const fs = require("fs");


exports.post_open_table = function (req, res, next) { // /tables/:number/open
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
        res
            .status(200)
            .contentType("text/plain")
            .end("The table is open successfully!");
    }
    else {
        let err = new Error('Table is not booked!');
        err.status = 400;
        return next(err);
    }
};

exports.post_add_table = function (req, res, next) {
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
    res
        .status(200)
        .contentType("text/plain")
        .end("The table is create successfully!");
};

exports.post_delete_table = function (req, res, next) {
    if (db_helper.getElementsFromDir('./public/database/tables').indexOf(req.params.number) === -1) {
        let err = new Error('Столик не существует!');
        err.status = 400;
        return next(err);
    }
    let path = './public/database/tables/' + req.params.number + '.json'
    fs.unlinkSync(path)
    res
        .status(200)
        .contentType("text/plain")
        .end("The table is delete successfully!");
};