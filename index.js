const config = require('./Config.js')
const {PORT} = config

const express = require("express");
const cors = require('cors');
const multer = require('multer')
const { 
  verificarUsuario,
  insertarEmpresa,
  insertarUsuario,
  insertarServicio,
  insertarComentario,
  obtenerDataServicio,
  obtenerImagenesServicio,
  obtenerServiciosEmpresa,
  obtenerServiciosPorTipo,
  verComentario,
  verEmpresas,
  cambiarEstado
} = require("./Conexion/Consultas");

const app = express();
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});
app.use(express.json())

app.use(cors({ credentials: true, origin: 'https://appturistas.netlify.app' }));
const port = PORT;


//Se hace login
app.get('/login/:tipo/:correo/:contrasena', (req, res) => {
  const tipo = req.params.tipo;
  const correo = req.params.correo;
  const contrasena = req.params.contrasena;

  verificarUsuario(tipo, correo, contrasena, (resultado) => {
    res.send(resultado ?? 'error')
  })
})

//Se agrega una nueva empresa
app.get("/empresa/insertar/:rut/:nombre/:correo/:contrasena/:facebook/:instagram/:whatsapp/:telefono/:direccion", (req, res) => {
  const datos = req.params;

  insertarEmpresa(datos, resultado => {
    res.send(resultado ?? 'error')
  })
})

//Se agrega un nuevo usuario
app.get("/usuario/insertar/:id/:nombre/:correo/:contrasena/:telefono", (req, res) => {
  const datos = req.params;

  insertarUsuario(datos, resultado => {
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

//Se inserta un nuevo comentario 
app.get("/servicio/insertarcomentario/:titulo/:descripcion/:valor/:idServ/:idUser", (req, res) => {
  const titulo = req.params.titulo;
  const descripcion = req.params.descripcion;
  const valor = req.params.valor;
  const idServ = req.params.idServ;
  const idUser = req.params.idUser;

  insertarComentario(titulo, descripcion, valor, idServ, idUser, resultado => {
    res.send(resultado ?? 'error')
  })
})

//ver comentarios
app.get("/servicio/vercomen/:idServ", (req, res) => {
  const idServ = req.params.idServ;

  verComentario(idServ, resultado => {
    res.send(resultado ?? 'error')
  })
})

app.get("/verEmpresas", (req, res) => {

  verEmpresas(resultado => {
    res.send(resultado ?? 'error')
  })
})

//Se obtiene un servicio por su id
app.get("/servicio/:id", function (req, res) {
  const articleId = req.params.id;

  obtenerDataServicio(articleId, resultado => {
    res.send(resultado ?? 'error')
  })
});

//Se obtienen las imágenes de un servicio por su id
app.get("/servicio/imagenes/:id", function (req, res) {
  const articleId = req.params.id;

  obtenerImagenesServicio(articleId, resultado => {
    res.send(resultado ?? 'error')
  })
});

//Se filtra por tipo de servicio
app.get("/:tipoServicio", function (req, res) {
  const tipoServicio = req.params.tipoServicio;

  obtenerServiciosPorTipo(tipoServicio, resultado =>{
    res.send(resultado ?? 'error');
  })
});

//Se obtienen los servicios ofrecidos por una empresa
app.get("/empresa/servicios/:id", function (req, res) {
  const empresaId = req.params.id;

  obtenerServiciosEmpresa(empresaId, resultado =>{
    res.send(resultado ?? 'error')
  })
});

app.get("/empresa/servicios/:estado/:idEmpresa", function (req, res) {
  const estado = req.params.estado;
  const idEmpresa = req.params.idEmpresa;

  cambiarEstado(estado, idEmpresa, resultado =>{
    res.send(resultado ?? 'error')
  })
});


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

