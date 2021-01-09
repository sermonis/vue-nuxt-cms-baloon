const Redis = require("ioredis");
const redis = new Redis();
const express = require("express");
const app = express();
const dotenv = require('dotenv').config().parsed;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 4000;


app.post('/auth', async (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    res.send({
      user:{
        name: "Ali Güzel",
        id:"12345"
      },
      token:"aliguzeltoken2"
    })
});

app.get("/", async (req, res) => {
  const data = await redis.get("framework");
  console.log(req.query);
  res.send(dotenv);
});

app.post("/", (req, res) => {
  console.log(req.headers["user-agent"]);
  console.log(req.headers);
  res.send("all fine");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
