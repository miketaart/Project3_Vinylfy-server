var request = require("request");
var express = require("express");
var app = express();


const api_key = "JkjkJaFTmHXCgDmTnwcV";
const secret = "DDUXNYboJNDLbwhCZaazYnYmsVNSSIzO";


app.get("/wantlist/user/:username", (req, res) => {
  var options = {
    'method': 'GET',
    'url': `https://api.discogs.com/users/${req.params.username}/wants?key=${api_key}&secret=${secret}`,
    //'withCredentials': true,
    'headers': {
      'user-agent': "nodejs" // api needs the user agent header to be specified
    },
    json: true // when requesting, express sends back info unparsed. set json: true to parse it (axios does this already for you)
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.json(response.body)
  });

})

module.exports = app;