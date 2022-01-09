const db_helper = require('../controllers/db_helper');

exports.get = function (is_admin) {
    return function (req, res, next) {
        let names = [];
        let posts = [];
        let selfs = [];
        let images = [];
        let elements = db_helper.getListObjects('./public/database/staff/')
        for (let i in elements) {
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
            images: images,
            is_admin: is_admin
        });
    }
};