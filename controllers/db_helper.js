const fs = require('fs');

exports.getElementsFromDir = function(path) {
    let elements = [];
    let files = fs.readdirSync(path);
    for (let i in files) {
        let index_point = -1
        let file_name = ''
        for (let symbol in files[i])
            if (files[i][symbol] === '.')
                index_point = symbol
        for (let symbol in files[i]) {
            if (symbol === index_point)
                break
            else
                file_name = `${file_name}${files[i][symbol]}`
        }
        // elements.push(files[i].split('.')[0]);
        elements.push(file_name);
    }
    return elements;
}

exports.getListObjects = function(path) {
    let elements = [];
    let files = fs.readdirSync(path);
    for (let i in files)
        elements.push(JSON.parse(fs.readFileSync(path + '/'+ files[i].toString()).toString()));
    return elements;
}

exports.getObjectByPath = function (path) {
    return JSON.parse(fs.readFileSync(path).toString())
}

exports.writeObject = function (path, object){
    fs.writeFileSync(path, JSON.stringify(object))
}

exports.createFolder = function (path) {
    fs.mkdir(path, err => {})
}

exports.deleteFolder = function (path) {
    fs.rmdir(path, err => {})
}

exports.deleteFile = function (path) {
    fs.unlinkSync(path)
}

exports.existFile = function (path, file) {
    return this.getElementsFromDir(path).indexOf(file) !== -1
}