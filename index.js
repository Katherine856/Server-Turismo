const express = require("express");
const cors = require('cors');
const multer = require('multer')
const { 
  verificarUsuario,
  insertarEmpresa,
  insertarServicio,
  obtenerDataServicio,
  obtenerImagenesServicio,
  obtenerServiciosEmpresa,
  obtenerServiciosPorTipo,
  insertarComentario
} = require("./Conexion/Consultas");

const app = express();
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});
app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
const port = 5000;


//Se hace login
app.get('/login/:tipo/:correo/:contrasena', (req, res) => {
  const tipo = req.params.tipo;
  const correo = req.params.correo;
  const contrasena = req.params.contrasena;

  verificarUsuario(tipo, correo, contrasena, (resultado) => {
    console.log(resultado);
    res.send(resultado ?? 'error')
  })
})

//Se agrega una nueva empresa
app.get("/empresa/insertar/:rut/:nombre/:correo/:contrasena/:facebook/:instagram/:whatsapp/:telefono/:direccion", (req, res) => {
  const datos = req.params;

  insertarEmpresa(datos, resultado => {
    console.log(resultado);
    res.send(resultado ?? 'error')
  })
})

//Se inserta un nuevo servicio 
app.post("/servicio/insertar", upload.array('imagenes', 10), (req, res) => {
  const datos = req.body;
  const archivos = req.files;
  
  insertarServicio(datos, archivos, resultado => {
    console.log(`Servicio insertado: ${resultado}`);
    res.send(resultado ?? 'error');
  })
})

//Se inserta un nuevo comentario 
app.post("/servicio/insertarcomentario", (req, res) => {
  const datos = req.body;
  console.log(req.body)

  insertarComentario(datos, resultado => {
    console.log(`Servicio insertado: ${resultado}`);
    res.send(resultado ?? 'error')
  })
})

//Se obtiene un servicio por su id
app.get("/servicio/:id", function (req, res) {
  const articleId = req.params.id;

  obtenerDataServicio(articleId, resultado => {
    //console.log(resultado);
    res.send(resultado ?? 'error')
  })
});

//Se obtienen las imágenes de un servicio por su id
app.get("/servicio/imagenes/:id", function (req, res) {
  const articleId = req.params.id;

  obtenerImagenesServicio(articleId, resultado => {
    //console.log(resultado);
    res.send(resultado ?? 'error')
  })
});

//Se filtra por tipo de servicio
app.get("/:tipoServicio", function (req, res) {
  const tipoServicio = req.params.tipoServicio;

  obtenerServiciosPorTipo(tipoServicio, resultado =>{
    console.log(resultado);
    res.send(resultado ?? 'error');
  })
});

//Se obtienen los servicios ofrecidos por una empresa
app.get("/empresa/servicios/:id", function (req, res) {
  const empresaId = req.params.id;

  obtenerServiciosEmpresa(empresaId, resultado =>{
    console.log(resultado);
    res.send(resultado ?? 'error')
  })
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

