const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Doppleganger06!@",
  database: "to_do_list",
});
db.connect((err) => {
  if (err) return console.log("error" + err.message);

  console.log("Connected to Database");
});

module.exports = db;
