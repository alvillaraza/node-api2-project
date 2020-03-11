const express = require("express");
const HubsRouter = require("../hubs/hubs-router.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  const query = req.query;

  res.status(200).json(query);
});

server.use("/api/posts", HubsRouter);

module.exports = server;
