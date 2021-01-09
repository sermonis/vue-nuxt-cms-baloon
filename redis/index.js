const Redis = require("ioredis");
const redis = new Redis();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", async (req, res) => {
  const data = await redis.get("framework");
  console.log(req.query);
  res.send(data + req.params);
});

app.post("/", (req, res) => {
  console.log(req.headers["user-agent"]);
  console.log(req.headers);
  res.send("all fine");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
