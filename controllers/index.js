exports.get = function(is_admin) {
    return function (req, res, next) {
        res.render('index', {
            title: 'The Krusty Krab',
            is_admin: is_admin
        });
    };
}

