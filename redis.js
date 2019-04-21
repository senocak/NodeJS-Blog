const redis = require("redis");
let client = redis.createClient();
client.on("connect", function() {
    console.log("Redis Connected ");
});
module.exports = client;