const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    } 
    console.log('Connection à la base de donnée réussie !');
});


module.exports = connection;