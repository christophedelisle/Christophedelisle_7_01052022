const mysql = require("mysql");

// CONNEXION DB MYSQL

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reseau_social",
});

module.exports.getDB = () => {
  return db;
};
