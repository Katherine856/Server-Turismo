const connection = require('./Conectar');
const { subirImagenes, cargarImagenes } = require('./Util');


let verificarUsuario = (correo, contrasena, datosCorrectos) => {
  let query = `SELECT Id_Empresa FROM empresa WHERE C_Empresa = '${correo}' AND K_Empresa = '${contrasena}'`;
  connection.query(query,
    (err, result) => {
      if (!err && result.length === 1) {
        datosCorrectos('' + result[0].Id_Empresa);
      } else {
        datosCorrectos(false);
      }
    })
}

let insertarEmpresa = (datos, resultado) => {
  let query = `
    INSERT INTO empresa VALUES (${datos.rut}, '${datos.nombre}', '${datos.correo}', '${datos.contrasena}', '${datos.facebook}', '${datos.instagram}', '${datos.whatsapp}', ${datos.telefono}, '${datos.direccion}', 'InActivo')
    `

  console.log(query);
  connection.query(query, (err, result, fields) => {
    if (!err) {
      resultado(result)
    } else {
      resultado(false)
    }
  });
}
let insertarServicio = (datos, archivos, resultado) => {
  datos.id = Math.ceil(Math.random() * 2147483646);
  let query = `
    INSERT INTO servicio VALUES (${datos.id}, '${datos.nombre}', ${datos.idEmpresa}, ${datos.min}, ${datos.max}, '${datos.descripcion}', ${datos.tipo})
    `;
  // console.log(query);
  connection.query(query, (err, result) => {
    if (!err) {
      try {
        subirImagenes(datos.id, archivos, (r) => {
          let objeto = {id: datos.id, nombre: datos.nombre}          
          if (r) resultado(objeto)
        })
      } catch (e) {
        console.log(e);
        resultado(false)
      }
    } else {
      console.log(err);
      resultado(false)
    }
  });
}

let obtenerDataServicio = (id, resultado) => {
  connection.query(`
    SELECT Id_Servicio, N_Servicio, N_Empresa, V_Min_Servicio, V_Max_Servicio, D_Servicio, F_Empresa, I_Empresa, W_Empresa, T_Empresa, C_Empresa D_Empresa, C_T_Servicio 
    FROM Servicio, Empresa, Tipo_servicio 
    WHERE Empresa.Id_Empresa=Servicio.Id_Empresa AND Servicio.Id_T_Servicio=Tipo_Servicio.Id_T_Servicio AND Id_Servicio=${id};
    `, (err, result, fields) => {
    if (!err) {
      resultado(result[0]);
    } else {
      resultado(false)
    }
  });
}

let obtenerImagenesServicio = (id, callback) => {
  let imagenes = cargarImagenes(id);
  response = imagenes ? imagenes : null;
  callback(response);
}

let obtenerServiciosEmpresa = (id, resultado) => {
  connection.query(`
  SELECT Id_Servicio, N_Servicio, Empresa.N_Empresa, V_Min_Servicio, V_Max_Servicio, C_T_Servicio 
  FROM Servicio, Empresa, Tipo_Servicio 
  WHERE servicio.Id_Empresa=Empresa.Id_Empresa 
  AND tipo_servicio.Id_T_Servicio=servicio.Id_T_Servicio 
  AND Servicio.Id_Empresa=${id};
  `, (err, result, fields) => {
    if (!err) {
      resultado(result)
    } else {
      resultado(false)
    }
  });
}

const obtenerServiciosPorTipo = (id, resultado) => {
  connection.query(`
  SELECT Id_Servicio, N_Servicio, Empresa.N_Empresa, V_Min_Servicio, V_Max_Servicio, C_T_Servicio, N_T_Servicio
  FROM Servicio, Empresa, Tipo_Servicio
  WHERE Empresa.Id_Empresa=Servicio.Id_Empresa AND Servicio.Id_T_Servicio=Tipo_Servicio.Id_T_Servicio AND tipo_servicio.N_T_Servicio='${id}';
  `, (err, result) => {
    if (!err) {
      console.log(result);
      resultado(result)
    } else {
      console.log(err);
      resultado(false)
    }
  });
}

module.exports = {
  verificarUsuario,
  insertarEmpresa,
  insertarServicio,
  obtenerDataServicio,
  obtenerImagenesServicio,
  obtenerServiciosEmpresa,
  obtenerServiciosPorTipo
}
