const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); //right now we accept requests from all domains, but when we go to production, we will only accept requests from certain sites

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
