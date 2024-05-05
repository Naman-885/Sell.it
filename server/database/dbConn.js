const mysql = require('mysql2');
require('dotenv').config({path:'./secure.env'});

const host = process.env.HOST;
const user = process.env.USER;
const port = process.env.PORT;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

var con = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected with database");
});

module.exports = con;