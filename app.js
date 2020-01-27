const cors = require("cors");
var express = require("express");
var app = express();

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
app.use("/discogs", require("./api-proxies/discogsCollection"));
app.use("/discogs", require("./api-proxies/discogsWantlist"));
app.use("/auth", require("./routes/auth"));
app.use("/testApi", require("./routes/testApi"));

app.listen(8000, () => {
  console.log("listening");
});