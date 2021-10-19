require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// db connection
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Boufadou:' + process.env.PW + '@cluster0.lvysm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//creates Schema
const urlSchema = new mongoose.Schema({
  original: {type: String, required: true},
  short: Number
})

// creates model
let Url = mongoose.model('Url', urlSchema)

// post request
var bodyParser = require("body-parser")
let myJsonObj = {};
app.post('/api/shorturl', bodyParser.urlencoded({extended: false}), (request, response) => {
  let inputUrl = request.body['url']  // thanks to parser we can get url input

// is it a valid url
  let myRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  if(!myRegex.test(inputUrl)) {
    response.json({error: 'invalid url'})
    return // so we are sure the code after is not executed
  }
  myJsonObj['original_url'] = inputUrl

  let inputShort = 1

  Url.findOne({})
      .sort({short: 'desc'})
      .exec((error, result) => {
        if(!error && result != undefined) {
          inputShort = result.short + 1
        }
        if(!error){
          Url.findOneAndUpdate(
            {original: inputUrl},
            {original: inputUrl, short: inputShort},
            {new: true, upsert: true},   // new returns original, upsert creates entry if it doesntexist 
            (error, savedUrl) => {
              if(!error){
                myJsonObj['short_url'] = savedUrl.short
                response.json(myJsonObj)
              }
            }
          )
        }
      })
}) // post end

// redirecting
app.get('/api/shorturl/:input', (request, response) => {
  let input = request.params.input
  Url.findOne({short: input}, (error, result) => {
    if(!error && result != undefined) {
      response.redirect(result.original)
    } else {
      response.json('URL not Found')
    }
  })
})
