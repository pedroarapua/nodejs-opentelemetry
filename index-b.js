require("./tracing")("service-b");
const express = require("express");
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.get("/get", async (_, res) => {
  res.send('OK');
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};
startServer();