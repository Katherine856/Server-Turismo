const { mkdir, writeFile, readdirSync, readFileSync } = require('node:fs');
const path = require('path')
const mime = require('mime-types')

const subirImagenes = (id, archivos, callback) => {
    let pathName = `./img/${id}`;
    mkdir(pathName, function (err) {
        if (!err) {
            for (const img of archivos) {
                writeFile(`${pathName}/${img.originalname}`, img.buffer, (err) => {
                    console.log(err ? err : 'Subida bien');
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
            const buffer = readFileSync(filepath);
            const contentType = mime.contentType(filepath);
            return {
                name: filename,
                buffer: buffer,
                contentType: contentType
            }
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