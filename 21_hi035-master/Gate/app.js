const express = require('express');
const https = require('https');
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const ejs = require('ejs');
const { connect } = require('http2');

//Templete Engine
app.set('view engine', 'ejs');

// Parsing Middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
// Parse Application 
app.use(express.json());
//Static files
app.use(express.static('public'));

var options = {
    key: fs.readFileSync('./keys/key.pem', 'utf8'),
    cert: fs.readFileSync('./keys/server.crt', 'utf8')
};

app.set('port', port);

//Router
const routes = require('./server/routes/user');
app.use('/', routes);

var server = https.createServer(options, app);

server.listen(port, () => {
  console.log("https://localhost:" + port)
});

