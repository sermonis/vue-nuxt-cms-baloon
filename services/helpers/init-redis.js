const Redis = require("ioredis");
const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  enableAutoPipelining: true
});
redis.on("connect", () => {
  console.log("redis connected to server");
});

redis.on("ready", () => {
  console.log("client connected to redis server");
});

redis.on("error", error => {
  console.log(error.message);
});

redis.on("end", () => {
  console.log("client left from server");
});

process.on("SIGINT", () => {
  redis.quit();
});

module.exports = redis;
