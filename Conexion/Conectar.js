const config = require('../Config.js');
const { HOST, USER, PASSWORD, DATABASE, DB_PORT } = config
//const AcreatePool = require('mysql2/promise');
//const { createPool } = AcreatePool

let mysql = require('mysql2');
let connection = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: DB_PORT,
  database: DATABASE
});

console.log(HOST + ': ' + USER + ': ' + PASSWORD + ': ' + DB_PORT + ': ' + DATABASE);

module.exports = connection
