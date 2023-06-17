const config = require('../Config.js');
const { HOST, USER, PASSWORD, DATABASE, DB_PORT } = config

let mysql = require('mysql');
let connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: DB_PORT,
  database: DATABASE
});

console.log(HOST + ': ' + USER + ': ' + PASSWORD + ': ' + DB_PORT + ': ' + DATABASE);
connection.connect((err) => {
  //console.log(err ? 'Hubo un error': 'Conexión exitosa');
})

module.exports = connection
