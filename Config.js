const libreria = require("dotenv");
const { config } = libreria

config()

console.log(process.env.PORT)

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || "localhost"
const USER = process.env.USER || "root"
const PASSWORD = process.env.PASSWORD || ""
const DATABASE = process.env.DATABASE || "pg"
const DB_PORT = process.env.DB_PORT || 3306

module.exports = { PORT, HOST, USER, PASSWORD, DATABASE, DB_PORT}