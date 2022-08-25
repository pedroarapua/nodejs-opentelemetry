require("./tracing")("service-a");
const express = require("express");
const axios = require('axios');
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 3000;
const serviceBUrl = process.env.SERVICEB_URL || 'http://localhost:3001';
const mongodbHost = process.env.MONGODB_HOST || 'localhost';
const mongodbPort = process.env.MONGODB_PORT || 27017;
const mongodbUrl = `mongodb://${mongodbHost}:${mongodbPort}`;
let db;

const app = express();
app.use(express.json());

app.get("/todo", async (_, res) => {
  const response = await axios.get(`${serviceBUrl}/get`)
  const todos = await db.collection("todos").find({}).toArray();
  res.send(todos);
});

app.get("/todo/:id", async (req, res) => {
  const todo = await db.collection("todos").findOne({ id: req.params.id });
  res.send(todo);
});

const startServer = () => {
  MongoClient.connect(mongodbUrl, (err, client) => {
    db = client.db("todo");
    db.collection("todos").insertMany([
     { id: "1", title: "Buy groceries" },
     { id: "2", title: "Install Aspecto" },
     { id: "3", title: "buy my own name domain" },
   ]);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};
startServer();