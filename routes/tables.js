var express = require('express');
const fs = require("fs");
var router = express.Router();
var db_helper = require('../controllers/db_helper');


// function getElementsFromDir(path='./public/database/tables'){
//     let elements = [];
//     let files = fs.readdirSync(path);
//     for (let i in files)
//         elements.push(files[i].split('.')[0]);
//     return elements;
// }
//
// function getListTables(path='./public/database/tables'){
//     let tables = [];
//     let files = fs.readdirSync(path);
//     for (let i in files)
//          tables.push(JSON.parse(fs.readFileSync('./public/database/tables/' + files[i].toString()).toString()));
//     return tables;
// }

router.get('/', function(req, res, next) {
    //res.send('tables');
    let tables = db_helper.getListObjects('./public/database/tables/');
    let numbers = []
    for (let index in tables)
        numbers.push(tables[index].number)
    res.render('tables', {
        title: 'The Krusty Krab',
        page: 'Tables',
        description: 'Можете заказать столик',
        tables: numbers,
    })
});

router.get('/:number', function (req, res, next){
    if (db_helper.getElementsFromDir('./public/database/tables').indexOf(req.params.number) === -1) {
        let err = new Error('Table not found');
        err.status = 404;
        return next(err);
    }
    let table = JSON.parse(fs.readFileSync('./public/database/tables/' + req.params.number + '.json').toString())
    res.render('table',{
        title: 'The Krusty Krab',
        page: 'Table ' + table.number,
        table_status: table.status,
        description: table.description,
    })
})

router.post('/:number',
    function (req, res, next) {
        if (db_helper.getElementsFromDir('./public/database/tables').indexOf(req.params.number) === -1 || req.body.name.length < 7) {
            let err = new Error('Error when booking a table');
            err.status = 400;
            return next(err);
        }
        let path = './public/database/tables/' + req.params.number + '.json'
        let table = JSON.parse(fs.readFileSync(path).toString())
        if (table.status) {
            table.owner = req.body.name
            table.status = false
            fs.writeFileSync(path, JSON.stringify(table))
            res
                .status(200)
                .contentType("text/plain")
                .end("The table is booked successfully!");
        }
        else {
            let err = new Error('Table is booked!');
            err.status = 400;
            return next(err);
        }
    }
)

// router.post('/:number',
//     //body('name', 'Name must not be empty.').trim().isLength({ min: 7 }).escape(),
//     function (req, res, next) {
//             if (getElementsFromDir().indexOf(req.params.number) === -1) {
//                 let err = new Error(req.params.number)//'Table not found + 1');
//                 err.status = 404;
//                 return next(err);
//             }
//             let path = './public/database/tables/' + req.params.number + '.json'
//             let table = JSON.parse(fs.readFileSync(path).toString())
//             if (table.status) {
//                 table.owner = req.body.name
//                 fs.writeFileSync(path, JSON.stringify(table))
//             }
// res
//     .status(200)
//     .contentType("text/plain")
//     .end("File uploaded!");
//
//             //return res.get('/')
//             res.redirect('/tables')
//             // return;// + req.params.number)
//             // res.render('table',{
//             //     title: 'The Krusty Krab',
//             //     page: 'Table ' + table.number,
//             //     table_status: table.status,
//             //     description: table.description,
//             // })
//         }
//     )

module.exports = router;