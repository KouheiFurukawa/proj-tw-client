const Twitter = require("twitter");
const fs = require("fs");

const client = new Twitter(JSON.parse(fs.readFileSync("secret.json","utf-8")));
