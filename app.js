const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 8000;


const session = require('express-session')

var sessionOptions = {
  secret: 'keyboard cat',
  cookie: {}
}
app.use(session(sessionOptions));

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost:27017/vinylfy', options, (err, connectionInfo) => {
  if (err) console.log("ERROR", err);
  else console.log("connected to db");
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);

app.use("/spotify", require("./api-proxies/spotify"));
app.use("/discogs", require("./api-proxies/discogs"));

app.use("/auth", require("./routes/auth"));

app.use((err, req, res, next) => {
  res.status(err.status)
  res.json({
    error: err.message
  })
})

app.listen(PORT, () => {
  console.log("listening, server is running on Port: " + PORT);
})