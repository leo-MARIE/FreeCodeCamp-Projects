// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date?', function(req, res) {

var inputDate = req.params.date;
var myRegex = /^[0-9]+$/;
var myDate = new Date();
var myUnixDate = 0;
var myUtcDate = new Date();
var myObjDate = {};
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

if(myRegex.test(inputDate)) {                                 // if unix input
	myUnixDate = inputDate;
	myUtcDate = new Date(parseInt(myUnixDate)).toUTCString();
	myObjDate = {unix: parseInt(myUnixDate), utc: myUtcDate};
}

else if(!req.params.date) {                    // if empty
	myDate = new Date();      
	myUnixDate = myDate.getTime();
	myUtcDate = myDate.toUTCString();
  myObjDate = {unix: parseInt(myUnixDate), utc: myUtcDate};
}

else if(isValidDate(new Date(inputDate)) == false) {              // if invalid date
myObjDate = { error : "Invalid Date" };
}

else {
 myDate = new Date(inputDate);                               // if valid string input
 myUnixDate = myDate.getTime();
 myUtcDate = myDate.toUTCString();
 myObjDate = {unix: parseInt(myUnixDate), utc: myUtcDate};
}

res.json(myObjDate);

});  // app.get