const db_helper = require('../controllers/db_helper');

exports.get = function(is_admin) {
    return function (req, res, next) {
        let elements = [];
        let files = db_helper.getElementsFromDir('./public/database/menu');
        let menu = '/menu/'
        if(is_admin)
            menu = '/admin/menu/'
        for (let i in files) {
            let name = menu + files[i];
            elements.push(name);
        }
        res.render('menu', {
            title: 'The Krusty Krab',
            page: 'Меню',
            description: 'Выберите категорию',
            list: elements,
            is_admin: is_admin
        });
    };
}


exports.get_by_type = function(is_admin) {
    return function (req, res) {
        let elements = db_helper.getListObjects('./public/database/menu/' + req.params.type);
        let names = [];
        let descriptions = [];
        let compositions = [];
        let images = []
        for (let index in elements) {
            let el = elements[index]
            names.push(el.name);
            descriptions.push(el.description);
            compositions.push(el.composition)
            images.push(el.image)
        }
        res.render('food', {
            title: 'The Krusty Krab',
            page: req.params.type,
            description: 'Выберите позицию',
            names: names,
            descriptions: descriptions,
            compositions: compositions,
            images: images,
            is_admin: is_admin
        });
    };
}
