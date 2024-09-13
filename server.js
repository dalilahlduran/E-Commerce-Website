const express = require("express");

const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors())

server.get('/', (req, res) => {
  res.send({ message: "Working" });
});

server.use("/routes", require("./api"));

module.exports = server;
