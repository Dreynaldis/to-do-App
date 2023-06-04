const db = require("../connection/conn");
const util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports = {
  getTodo: async (req, res) => {
    try {
      let reqId = parseInt(req.params.userid);
      let getData = await query(`select * from to_do where userId=${reqId}`);
      res.status(201).send(getData);
    } catch (error) {}
  },
  addTodo: async (req, res) => {
    try {
      let data = req.body;
      let postData = await query(
        `insert into to_do (userId, toDoItem, status) values (${data.userid}, "${data.toDoItem}", 0)`
      );
      res.status(201).send(postData);
    } catch (error) {}
  },
  updateStatus: async (req, res) => {
    try {
      let reqId = parseInt(req.query.id);
      let getData = await query(
        `update to_do set status = not status where id = ${reqId};`
      );
      res.status(201).send(getData);
    } catch (error) {}
  },
  editTodo: async (req, res) => {
    try {
      let reqId = parseInt(req.query.id);
      let reqEdit = req.body.toDoItem;
      let getData = await query(
        `update to_do set toDoItem="${reqEdit}" where id=${reqId}`
      );
      res.status(201).send(getData);
    } catch (error) {}
  },
  deleteTodo: async (req, res) => {
    try {
      let reqId = parseInt(req.query.id);
      let deleteData = await query(`delete from to_do where id = ${reqId};`);
      res.status(201).send(deleteData);
    } catch (error) {}
  },
};
