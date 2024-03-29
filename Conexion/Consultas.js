const connection = require('./Conectar');
const { subirImagenes, cargarImagenes } = require('./Util');

let verificarUsuario = (tipo, correo, contrasena, datosCorrectos) => {
  let query = `SELECT Id_${tipo} FROM ${tipo} WHERE C_${tipo} = '${correo}' AND K_${tipo} = '${contrasena}'`;
  connection.query(query,
    (err, result) => {
      if(!err && result.length === 1){
        if (tipo==='Empresa') {
          datosCorrectos('' + result[0].Id_Empresa);
        }
        else if (tipo==='Usuario') {
          datosCorrectos('' + result[0].Id_Usuario);
        }
        else if (tipo==='Administrador') {
          datosCorrectos('' + result[0].Id_Administrador);
        } else {
          datosCorrectos(false);
        }
      } else {
        datosCorrectos(false);
      }
    })
}

let insertarEmpresa = (datos, resultado) => {
  let query = `
    INSERT INTO Empresa VALUES (${datos.rut}, '${datos.nombre}', '${datos.correo}', '${datos.contrasena}', '${datos.facebook}', '${datos.instagram}', '${datos.whatsapp}', ${datos.telefono}, '${datos.direccion}', 'InActivo')
    `
  connection.query(query, (err, result, fields) => {
    if (!err) {
      resultado(result)
    } else {
      resultado(false)
    }
  });
}

let insertarUsuario = (datos, resultado) => {
  let query = `
    INSERT INTO Usuario VALUES (${datos.id}, '${datos.nombre}', '${datos.correo}', '${datos.contrasena}', ${datos.telefono})
    `
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
    INSERT INTO Servicio VALUES (${datos.id}, '${datos.nombre}', ${datos.idEmpresa}, ${datos.min}, ${datos.max}, '${datos.descripcion}', ${datos.tipo})
    `;

  connection.query(query, (err, result) => {
    if (!err) {
      try {
        subirImagenes(datos.id, archivos, (r) => {
          let objeto = {id: datos.id, nombre: datos.nombre}          
          if (r) resultado(objeto)
        })
      } catch (e) {
        resultado(false)
      }
    } else {
      resultado(false)
    }
  });
}

let insertarComentario = (titulo, descripcion, valor, idServicio, idUsuario, resultado) => {
  let id = Math.ceil(Math.random() * 2147483646);

  let query = `
    INSERT INTO Calificacion VALUES (${id}, '${titulo}', '${descripcion}', ${valor}, ${idServicio}, ${idUsuario})
    `;

  connection.query(query, (err, result, fields) => {
    if (!err) {
      resultado(true)
    } else {
      resultado(false)
    }
  });

}

let verComentario = (idServicio, resultado) =>{

  let query = `
  SELECT Titulo_Calificacion, Valor_Calificacion, Desc_Calificacion, N_Usuario FROM Calificacion, Usuario 
  WHERE Id_Servicio = ${idServicio} AND Calificacion.Id_Usuario=Usuario.Id_Usuario;
    `;

    connection.query(query, (err, result, fields) => {
      if (!err) {
        resultado(result)
      } else {
        resultado(false)
      }
    });  

}

let verEmpresas = (resultado) =>{
  console.log('Entro a ver empresas')

  let query = `
  SELECT * FROM Empresa;
    `;

    connection.query(query, (err, result, fields) => {
      if (!err) {
        resultado(result)
      } else {
        resultado(err)
      }
    });  

}

let obtenerDataServicio = (id, resultado) => {
    connection.query(`
    SELECT Id_Servicio, N_Servicio, N_Empresa, V_Min_Servicio, V_Max_Servicio, D_Servicio, F_Empresa, I_Empresa, W_Empresa, T_Empresa, C_Empresa, D_Empresa, C_T_Servicio 
    FROM Servicio, Empresa, Tipo_Servicio 
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
  WHERE Servicio.Id_Empresa=Empresa.Id_Empresa 
  AND Tipo_Servicio.Id_T_Servicio=Servicio.Id_T_Servicio 
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
  WHERE Empresa.Id_Empresa=Servicio.Id_Empresa 
  AND Servicio.Id_T_Servicio=Tipo_Servicio.Id_T_Servicio
  AND Empresa.E_Empresa='Activo'
  AND Tipo_Servicio.N_T_Servicio='${id}';
  `, (err, result) => {
    if (!err) {
      resultado(result)
    } else {
      resultado(false)
    }
  });
}

const cambiarEstado = (estado, idEmpresa, resultado) => {

  let query = `
  UPDATE Empresa SET E_Empresa = '${estado}' WHERE Id_Empresa = ${idEmpresa};
    `;
    connection.query(query, (err, result, fields) => {
      if (!err) {
        resultado(true)
      } else {
        resultado(false)
      }
    }); 

}

module.exports = {
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
}
