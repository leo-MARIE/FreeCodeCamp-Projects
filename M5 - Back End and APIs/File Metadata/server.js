var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

// ----- POST request -----

app.post('/api/fileanalyse', multer().single("upfile"), (req, res) => {

let myJsonObj = {};
myJsonObj.name = req.file.originalname;
myJsonObj.type = req.file.mimetype;
myJsonObj.size = req.file.size;

res.json(myJsonObj)

}) // post end