var express = require('express');
var router = express.Router();

// ------------------------------

var fs = require('fs');
//var path = require('path');

function getElementsFromDir(path){
    let elements = [];
    let files = fs.readdirSync(path);
    for (let i in files) {
        //let name = url + '/' + files[i];
        // if (fs.statSync(name).isDirectory()){
        //     getFiles(name, files_);
        // } else {
        //     files_.push(name);
        // }
        elements.push(files[i]);
    }
    return elements;
}
// ------------------------------

router.get('/', function(req, res, next) {
    let elements = [];
    let files = getElementsFromDir('./public/database/menu');
    for (let i in files) {
        let name = '/menu/' + files[i];
        // if (fs.statSync(name).isDirectory()){
        //     getFiles(name, files_);
        // } else {
        //     files_.push(name);
        // }
        elements.push(name);
    }
    res.render('menu', {
        title: 'The Krusty Krab',
        page: 'Menu',
        description: 'Choose food',
        list: elements
    });
});

router.get('/:type', function (req, res){
    let elements = [];
    let files = getElementsFromDir('./public/database/menu/' + req.params.type);
    for (let i in files)
        elements.push('/menu/' + req.params.type + '/' + files[i].split('.')[0]);
    res.render('menu', {
        title: 'The Krusty Krab',
        page: req.params.type,
        description: 'Choose food',
        list: elements
    });
})

router.get('/:type/:food', function (req, res){
    let food = JSON.parse(fs.readFileSync('./public/database/menu/' + req.params.type + '/' + req.params.food + '.json').toString())
    res.render('food', {
        title: 'The Krusty Krab',
        page: food.name,
        type: req.params.type,
        description: food.description,
        composition: food.composition,
        image: food.image
    });
})

module.exports = router;