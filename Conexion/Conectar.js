const config = require('../Config.js');
const { HOST, USER, PASSWORD, DATABASE } = config

let mysql = require('mysql');
let connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});

connection.connect((err) => {
  //console.log(err ? 'Hubo un error': 'Conexión exitosa');
})

module.exports = connection
