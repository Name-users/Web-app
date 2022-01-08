const db_helper = require('../controllers/db_helper');

exports.get = function(req, res, next) {
    let elements = [];
    let files = db_helper.getElementsFromDir('./public/database/menu');
    for (let i in files) {
        let name = '/menu/' + files[i];
        elements.push(name);
    }
    res.render('menu', {
        title: 'The Krusty Krab',
        page: 'Menu',
        description: 'Choose food',
        list: elements
    });
};

exports.get_by_type = function (req, res) {
    let elements = db_helper.getListObjects('./public/database/menu/' + req.params.type);
    let names = []; let descriptions = []; let compositions = []; let images = []
    for(let index in elements){
        let el = elements[index]
        names.push(el.name);
        descriptions.push(el.description);
        compositions.push(el.composition)
        images.push(el.image)
    }
    res.render('food', {
        title: 'The Krusty Krab',
        page: req.params.type,
        description: 'Choose food',
        names: names,
        descriptions: descriptions,
        compositions: compositions,
        images: images
    });
};
