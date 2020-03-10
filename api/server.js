const express = require("express");
const expressRouter = require("../hubs/hubs-router.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  const query = req.query;

  res.status(200).json(query);
});

server.use("api/posts", expressRouter);

module.exports = server;
