const express = require("express");
const cors = require('cors');
const connection = require("./conexion/Conectar");
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
const port = 5000;

app.get('/login/:correo/:contrasena', (req, res) => {
  const correo = req.params.correo;
  const contrasena = req.params.contrasena;

  connection.query(`SELECT Id_Empresa FROM empresa WHERE C_Empresa = '${correo}' AND K_Empresa = '${contrasena}'`,
  (err, result) => {
    if(!err){
      res.send(''+result[0].Id_Empresa);
    }else{
      console.log(err);
      res.sendStatus(505);
    }
  })
})

app.get("/empresa/insertar/:rut/:nombre/:correo/:contrasena/:facebook/:instagram/:whatsapp/:telefono/:direccion", (req, res) => {
  const datos = req.params;
  connection.query(`
  INSERT INTO empresa VALUES (${datos.rut}, '${datos.nombre}', '${datos.correo}', '${datos.contrasena}', '${datos.facebook}', '${datos.instagram}', '${datos.whatsapp}', ${datos.telefono}, '${datos.direccion}', 'InActivo')
  `, (err, result, fields) => {
    if (!err) {
      console.log(result);
    } else {
      throw err;
    }
  });
})

app.get("/servicio/insertar/:nombre/:empresa/:min/:max/:descripcion/:tiposervicio", (req, res) => {
  const datos = req.params;
  datos.id= Math.ceil(Math.random()*2147483646);
  console.log(`INSERT INTO servicio VALUES (${datos.id}, '${datos.nombre}', ${datos.empresa}, ${datos.min}, ${datos.max}, '${datos.descripcion}', ${datos.tiposervicio})`);
  connection.query(`
  INSERT INTO servicio VALUES (${datos.id}, '${datos.nombre}', ${datos.empresa}, ${datos.min}, ${datos.max}, '${datos.descripcion}', ${datos.tiposervicio})
  `, (err, result, fields) => {
    if (!err) {
      console.log(result);
      res.sendStatus(200);
    } else {
      console.log(err);
      res.sendStatus(505);
    }
  });

})


app.get("/servicio/:id", function (req, res) {
  
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
      res.sendStatus(505);
    }
  });

});

app.get("/:id", function (req, res) {

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

app.get("/empresa/servicios/:id", function (req, res) {

  const empresaId = req.params.id;

  connection.query(`
  SELECT Id_Servicio, N_Servicio, Empresa.N_Empresa, V_Min_Servicio, V_Max_Servicio, C_T_Servicio 
  FROM Servicio, Empresa, Tipo_Servicio 
  WHERE servicio.Id_Empresa=Empresa.Id_Empresa 
  AND tipo_servicio.Id_T_Servicio=servicio.Id_T_Servicio 
  AND Servicio.Id_Empresa=${empresaId};
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

