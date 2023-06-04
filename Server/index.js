const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Todo-list App</h1>");
});
app.use(
  cors({
    origin: `http://localhost:3000`,
  })
);
const { todoRouters, usersRouters } = require("./routers");
app.use("/todo", todoRouters);
app.use("/users", usersRouters);
app.listen(PORT, () => console.log("Server is running on port: " + PORT));
