const express = require("express");
const Router = express.Router();

const { usersRouters, usersControllers } = require("../controllers");
Router.get("/getusers", usersControllers.getUser);
Router.post("/register", usersControllers.registerUser);
Router.get("/login", usersControllers.loginUser);
Router.get("/loginstatus", usersControllers.getUserid);
module.exports = Router;
