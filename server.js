require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {SERVER_PORT}=process.env

// Basic Configuration
// const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(SERVER_PORT, function() {
  console.log(`Listening on port ${SERVER_PORT}`);
});
