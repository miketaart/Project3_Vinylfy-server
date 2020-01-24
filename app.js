/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
var express = require("express");
var app = express();

app.use("/spotify", require("./api-proxies/spotify"));
app.use("/discogs", require("./api-proxies/discogs"));

app.listen(3000, () => {
  console.log("listening");
});