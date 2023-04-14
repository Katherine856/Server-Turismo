const express = require("express");
const cors = require('cors');
const multer = require('multer')
const { 
  verificarUsuario,
  insertarEmpresa,
  insertarServicio,
  obtenerServicio,
  obtenerServiciosEmpresa,
  obtenerServiciosPorTipo
} = require("./Conexion/Consultas");

const app = express();
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
const port = 5000;

//Se hace login
app.get('/login/:correo/:contrasena', (req, res) => {
  const correo = req.params.correo;
  const contrasena = req.params.contrasena;

  verificarUsuario(correo, contrasena, (resultado) => {
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
    res.send(resultado ?? 'error');
  })
})

//Se obtiene un servicio por su id
app.get("/servicio/:id", function (req, res) {
  const articleId = req.params.id;

  obtenerServicio(articleId, resultado => {
    console.log(resultado);
    res.send(resultado ?? 'error')
  })
});

//Se filtra por tipo de servicio
app.get("/:id", function (req, res) {
  const serviciosId = req.params.id;

  obtenerServiciosPorTipo(serviciosId, resultado =>{
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

