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

exports.post_add_type_menu = function (req, res, next) {
    if (db_helper.getElementsFromDir('./public/database/menu').indexOf(req.params.number) !== -1 || req.body.type.length < 1) {
        let err = new Error('Категория уже существует!');
        err.status = 400;
        return next(err);
    }
    let path = './public/database/menu/' + req.body.type
    fs.mkdir(path, err => {})
    res
        .status(200)
        .contentType("text/plain")
        .end("The category is create successfully!");
};

exports.post_delete_type_menu = function (req, res, next) {
    if (db_helper.getElementsFromDir('./public/database/menu/' + req.params.type).length !== 0) { // FIXME: добавить проверку на существование каталога
        let err = new Error('Не удалось удалить категорию!');
        err.status = 400;
        return next(err);
    }
    fs.rmdirSync('./public/database/menu/' + req.params.type)
    res
        .status(200)
        .contentType("text/plain")
        .end("The category is delete successfully!");
};

// --------------------------------------

const multer = require("multer");

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

// const upload = multer({
//     dest: "./puplic/database/menu"
//     // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });

exports.get_menu_type_update = function (req, res, next) {
    //res.sendfile('./views/test_file.html');
    res.render('food_update', {
        title: 'The Krusty Krab',
        page: req.params.name,
        description: 'Update food'
    })
}

exports.post_menu_type_update = function (req, res, next) {
    //upload.single("file" /* name attribute of <file> element in your form */),
    //(req, res) => {
        let filedata = req.file;
        console.log(filedata);
        if (!filedata){
            let err = new Error('Ошибка загрузки изображения!');
            err.status = 400;
            return next(err);
        }
    res
        .status(200)
        .contentType("text/plain")
        .end("The successfully!");

        // const tempPath = req.file.path;
        // const targetPath = "./puplic/database/menu" + req.file.path;
        // if (/*path.extname(req.file.originalname).toLowerCase() === ".png" && */true) {
        //     fs.rename(tempPath, targetPath, err => {
        //         if (err) return handleError(err, res);
        //
        //         res
        //             .status(200)
        //             .contentType("text/plain")
        //             .end("File uploaded!");
        //     });
        // } else {
        //     fs.unlink(tempPath, err => {
        //         if (err) return handleError(err, res);
        //
        //         res
        //             .status(403)
        //             .contentType("text/plain")
        //             .end("Only .png files are allowed!");
        //     });
        // }

   // }
};