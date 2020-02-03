var express = require("express");
var app = express();
var request = require("request");

var client_id = process.env.API_KEY_SPOTIFY; // Your client id
var client_secret = process.env.SECRET_SPOTIFY; // Your secret

// your application requests authorization
var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

app.get("/album/:title", (req, res) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/search?q=${req.params.title}&type=album&limit=1`,
        //`https://api.spotify.com/v1/search?q=${req.params.title}&type=track&limit=1`,
        
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);1
        res.json(body);
      });
    }
  });
});

app.get("/album/tracklist/:albumID", (req, res) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/albums/${req.params.albumID}/tracks`,
        
        headers: {
          Authorization: "Bearer " + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
        res.json(body);
      });
    }
  });
});

 request.post(authOptions, function(error, response, body) {
   if (!error && response.statusCode === 200) {
     // use the access token to access the Spotify Web API
     var token = body.access_token;
     var options = {
       url: "https://api.spotify.com/v1/users/miketa",
       headers: {
         Authorization: "Bearer " + token
       },
       json: true
     };
     request.get(options, function(error, response, body) {
       //console.log(body);
     });
   }
});

module.exports = app;
