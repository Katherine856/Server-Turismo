const express = require("express");
const cors = require('cors');
const multer = require('multer')
const connection = require("./conexion/Conectar");

const app = express();
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});
const port = 5000;


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.get("/empresa/insertar/:rut/:nombre/:correo/:contrasena/:facebook/:instagram/:whatsapp/:telefono/:direccion", (req, res) => {
  const datos = req.params;
  console.log(datos);
})

//Se inserta un nuevo servicio 
app.post("/servicio/insertar", upload.array('imagenes', 10), (req, res) =>{
  console.log(req.files);
})

app.get("/servicio/:id", function (req, res) {
  console.log("ok");
  //connection.connect(); 
  
  const articleId = req.params.id;

  connection.query(`
  SELECT Id_Servicio, N_Servicio, N_Empresa, V_Min_Servicio, V_Max_Servicio, D_Servicio, F_Empresa, I_Empresa, W_Empresa, T_Empresa, C_Empresa D_Empresa, C_T_Servicio 
  FROM Servicio, Empresa, Tipo_servicio 
  WHERE Empresa.Id_Empresa=Servicio.Id_Empresa AND Servicio.Id_T_Servicio=Tipo_Servicio.Id_T_Servicio AND Id_Servicio=${articleId};
  `, (err, result, fields) => {
    if (!err) {
      console.log(result);
      res.send(result[0]);
    } else {
      throw err;
    }
  });
  //connection.end();
});

app.get("/:id", function (req, res) {
  console.log("comida");

  const serviciosId = req.params.id;

  connection.query(`
  SELECT Id_Servicio, N_Servicio, Empresa.N_Empresa, V_Min_Servicio, V_Max_Servicio, C_T_Servicio, N_T_Servicio
  FROM Servicio, Empresa, Tipo_Servicio
  WHERE Empresa.Id_Empresa=Servicio.Id_Empresa AND Servicio.Id_T_Servicio=Tipo_Servicio.Id_T_Servicio AND tipo_servicio.N_T_Servicio='${serviciosId}';
  `, (err, result, fields) => {
    if (!err) {
      console.log(result);
      res.send(result);
    } else {
      throw err;
    }
  });
});


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});