var request = require("request");
var express = require("express");
var app = express();

const api_key = "JkjkJaFTmHXCgDmTnwcV";
const secret = "DDUXNYboJNDLbwhCZaazYnYmsVNSSIzO";

var request = require('request');


app.get("/user/:username", (req, res) => {
  debugger
  var options = {
    'method': 'GET',
    'url': `https://api.discogs.com/users/${req.params.username}/collection/folders/0/releases?key=${api_key}&secret=${secret}`,
    'headers': {
      'user-agent': "nodejs" // api needs the user agent header to be specified
    }
  };
  request(options, function (error, response) {
    debugger
    if (error) throw new Error(error);
    console.log(response.body);
    res.json(response.body)
  });

})

module.exports = app;


// //https://api.discogs.com/database/search?q=Nirvana&key=JkjkJaFTmHXCgDmTnwcV&secret=DDUXNYboJNDLbwhCZaazYnYmsVNSSIzO
// request.get(
//   "https://api.discogs.com/database/search?q=Nirvana&key=JkjkJaFTmHXCgDmTnwcV&secret=DDUXNYboJNDLbwhCZaazYnYmsVNSSIzO",
//   function(error, response, body) {
//     debugger;
//     if (!error && response.statusCode === 200) {
//       // use the access token to access the Spotify Web API
//       var token = body.access_token;
//       console.log(body.access_token);
//       console.log(body);
//       // var options = {
//       //   url: "https://api.spotify.com/v1/users/jmperezperez",
//       //   headers: {
//       //     Authorization: "Bearer " + token
//       //   },
//       //   json: true
//       // };
//       // request.get(options, function(error, response, body) {
//       //   console.log(body);
//       // });
//     } else {
//       console.log(error);
//     }
//   }
// );