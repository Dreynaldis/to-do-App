const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);
module.exports = {
  getUser: async (req, res) => {
    try {
      let getData = await query("select * from users");
      res.status(201).send(getData);
    } catch (error) {}
  },
  registerUser: async (req, res) => {
    let data = req.body;

    await query(
      `insert into users (username, email, password) values ("${data.username}", "${data.email}", "${data.password}") `
    );
    res.status(201).send({
      isError: false,
      message: "User registered successfully",
      data: data,
    });
  },
  loginUser: async (req, res) => {
    let data = req.query;
    let getData = await query(
      `select * from users where username="${data.username}" and password="${data.password}"`
    );
    res.status(201).send(getData);
  },
  getUserid: async (req, res) => {
    let getId = parseInt(req.query.userid);
    let getData = await query(`select * from users where userid=${getId}`);
    res.status(201).send(getData);
  },
};
