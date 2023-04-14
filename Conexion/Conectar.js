let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pg'
});

connection.connect((err) => {
  //console.log(err ? 'Hubo un error': 'Conexión exitosa');
})

module.exports = connection
