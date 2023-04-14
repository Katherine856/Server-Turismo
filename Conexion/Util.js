const { mkdir, writeFile } = require('node:fs');

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
        }else{
            callback(false)
        }
    });
}

module.exports = subirImagenes;