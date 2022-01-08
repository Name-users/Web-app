const fs = require('fs');

exports.getElementsFromDir = function(path) {
    let elements = [];
    let files = fs.readdirSync(path);
    for (let i in files) {
        elements.push(files[i].split('.')[0]);
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