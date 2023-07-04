
const { MongoClient } = require("mongodb");

let MONGODB_URL =
  process.env.MONGODB_URL ||
  `mongodb+srv://jordaneruiz:${encodedPassword}@wine-db.opy3phj.mongodb.net/`;

console.log(`MONGODB_URL: "${MONGODB_URL}"`);
const client = new MongoClient(MONGODB_URL);


module.exports = client;
