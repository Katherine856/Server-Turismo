const express = require("express");
const cors = require('cors');
const connection = require("./conexion/Conectar");
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
const port = 5000;

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

app.get("/Comida", function (req, res) {
  console.log("comida");

  connection.query(`
  SELECT Id_Servicio, N_Servicio, Empresa.N_Empresa, V_Min_Servicio, V_Max_Servicio 
  FROM Servicio, Empresa 
  WHERE Empresa.Id_Empresa=Servicio.Id_Empresa AND Servicio.Id_T_Servicio=1;
  `, (err, result, fields) => {
    if (!err) {
      console.log(result);
      res.send(result);
    } else {
      throw err;
    }
  });
});

app.get("/Hospedaje", function (req, res) {
  console.log("hospedaje");

  connection.query(`
  SELECT Id_Servicio, N_Servicio, Empresa.N_Empresa, V_Min_Servicio, V_Max_Servicio 
  FROM Servicio, Empresa 
  WHERE Empresa.Id_Empresa=Servicio.Id_Empresa AND Servicio.Id_T_Servicio=3;
  `, (err, result, fields) => {
    if (!err) {
      console.log(result);
      res.send(result);
    } else {
      throw err;
    }
  });
});

app.get("/Transporte", function (req, res) {
  console.log("transporte");

  connection.query(`
  SELECT Id_Servicio, N_Servicio, Empresa.N_Empresa, V_Min_Servicio, V_Max_Servicio 
  FROM Servicio, Empresa 
  WHERE Empresa.Id_Empresa=Servicio.Id_Empresa AND Servicio.Id_T_Servicio=2;
  `, (err, result, fields) => {
    if (!err) {
      console.log(result);
      res.send(result);
    } else {
      throw err;
    }
  });
});

app.get("/Turismo", function (req, res) {
  console.log("turismo");

  connection.query(`
  SELECT Id_Servicio, N_Servicio, Empresa.N_Empresa, V_Min_Servicio, V_Max_Servicio 
  FROM Servicio, Empresa 
  WHERE Empresa.Id_Empresa=Servicio.Id_Empresa AND Servicio.Id_T_Servicio=4;
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