const express = require("express");
const Router = express.Router();

const { todoControllers } = require("../controllers");
Router.get("/gettodo/:userid", todoControllers.getTodo);
Router.patch("/updatestatus", todoControllers.updateStatus);
Router.patch("/edittodo", todoControllers.editTodo);
Router.post("/addtodo", todoControllers.addTodo);
Router.delete("/deletetodo", todoControllers.deleteTodo);
module.exports = Router;
