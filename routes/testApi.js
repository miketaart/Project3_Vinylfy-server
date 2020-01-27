const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('API is working properly') // respond with message 
})

module.exports = app;