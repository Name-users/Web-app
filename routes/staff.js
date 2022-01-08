var express = require('express');
const fs = require("fs");
var router = express.Router();


function getListStaff(path='./public/database/staff'){
    let tables = [];
    let files = fs.readdirSync(path);
    for (let i in files)
        tables.push(JSON.parse(fs.readFileSync('./public/database/staff/' + files[i].toString()).toString()));
    return tables;
}


router.get('/', function(req, res, next) {
    let names = [];
    let posts = [];
    let selfs = [];
    let images = [];
    let elements = getListStaff()
    for(let i in elements){
        let el = elements[i]
        names.push(el.name)
        posts.push(el.post)
        selfs.push(el.self)
        images.push(el.image)
    }
    res.render('staff', {
        title: 'The Krusty Krab',
        page: 'Staff',
        description: 'description',
        names: names,
        posts: posts,
        selfs: selfs,
        images: images
    });
});

module.exports = router;