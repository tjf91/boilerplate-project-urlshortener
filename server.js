require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {SERVER_PORT, MONGO_URI}=process.env
const mongoose = require('mongoose');
const urlController = require('./urlController');


// Basic Configuration
// const port = process.env.PORT || 3000;
app.use(express.urlencoded());
app.use(express.json());

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const uri=MONGO_URI

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});
  
  // const testUrl = new url({original:'original url',short:'short url'})

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.post('/api/shorturl/new', urlController.addUrl)
app.get('/api/shorturl/:short', urlController.getUrl)

app.listen(SERVER_PORT, function() {
  console.log(`Listening on port ${SERVER_PORT}`);
});
