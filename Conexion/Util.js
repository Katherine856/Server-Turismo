const { mkdir, writeFile, readdirSync, readFileSync } = require('node:fs');
const path = require('path')
const mime = require('mime-types')

const subirImagenes = (id, archivos, callback) => {
    let pathName = `./img/${id}`;
    mkdir(pathName, function (err) {
        if (!err) {
            for (const img of archivos) {
                writeFile(`${pathName}/${img.originalname}`, img.buffer, (err) => {
                    if(err) console.log(err);
                })
            }
            callback(true)
        } else {
            callback(false)
        }
    });
}

const cargarImagenes = (id) => {
    let pathImg = `./img/${id}`;
    try{
        let files = readdirSync(pathImg);
        const filesData = files.map( filename => {
            const filepath = path.join(pathImg, filename);
            const contentType = mime.contentType(filepath)
            const buffer = readFileSync(filepath);
            const base64Data = Buffer.from(buffer).toString('base64');
            return `data:${contentType};base64,${base64Data}`;
        })
        return filesData;
    }catch(err){
        return false;
    }
}

module.exports = {
    subirImagenes,
    cargarImagenes
};