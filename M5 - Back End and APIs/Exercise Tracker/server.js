// FCC exercise tracker test 15 fails

const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
var bodyParser = require("body-parser")

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

// db connection

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Boufadou:' + process.env.PW + '@cluster0.lvysm.mongodb.net/exercise?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//creates Schema and models

let userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
})
let User = mongoose.model('User', userSchema) 

let exerciseSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: String
})
let Exercise = mongoose.model('Exercise', exerciseSchema)


// ----- POST request create user -----
app.post('/api/users', bodyParser.urlencoded({ extended: false }), (request, response) => {

  let newUser = new User({username: request.body.username})  // create doc

  newUser.save((error, savedUser) => {    // save in db
    if(error) {
      response.send("Username taken")
    } else {
      let myJsonObj = {}                      // then in callback, feed json with savedUser
      myJsonObj["username"] = savedUser.username
      myJsonObj["_id"] = savedUser.id   // db provide an id for each entry
      response.json(myJsonObj)
    }  //else no error
  })  // save end
})   // post end

// ----- GET request list of users -----
app.get('/api/users', (req, res) => {
  User.find({}, (error, arrayOfUsers) => {  // empty obj means no selection criteria, we get an array of all docs
    if(!error) {
      res.json(arrayOfUsers)
    }   // if no error
  })    // find end
})      // get end                   

// ----- POST request add exercise -----
app.post('/api/users/:_id/exercises', bodyParser.urlencoded({extended: false}), (req, res) => {
  console.log("req.body.date : " + req.body.date)
    if(req.params._id != "" && req.body.description != "" && req.body.duration != "") {
  

    User.findById(req.params._id, (err, data) => {
      if(!data) {
        res.send("Unknown User");
      } else {
        const username = data.username;
      
        let dateVal = new Date();
        if(req.body.date != undefined) {
          dateVal = new Date(req.body.date)}

        const newExercise = new Exercise({
        userId: req.params._id,
        description: req.body.description,
        duration: req.body.duration,
        date: new Date(dateVal).toDateString()
        })
        newExercise.save((err, data) => {
          if(!err) {
          res.json({_id: data.userId, username: username, date: data.date, duration: parseInt(data.duration), description: data.description})

          console.log("newExercise.date : " + newExercise.date)

          } // if !err
        }) // save end
      } // else user exists
    }) // user find by id
  } // if fields are blank
})  // post end

// ----- GET request logs -----
app.get('/api/users/:_id/logs', (req, res) => {
  const userId = req.params._id
  const {from, to, limit} = req.query;
  
  User.findById(req.params._id, (err, data) => {
    if(!data) {
      res.send("Unknown User")
    } else {
    const username = data.username

   
    Exercise.find({ userId: req.params._id}, (err, docs) => {
    if(!err) {

      var logArr = docs.map((obj) => ({description: obj.description, duration: obj.duration, date: obj.date}));

      if(from != undefined) {
        timeFrom = new Date(from).getTime()
        logArr = logArr.filter((obj) => (new Date(obj.date).getTime() >= timeFrom))
         }
      
      if(to != undefined) {
        timeTo = new Date(to).getTime()
        logArr = logArr.filter((obj) => (new Date(obj.date).getTime() <= timeTo))
         }

      if(limit != undefined) {
        logArr = logArr.slice(0, limit)
      }
    
      const myJsonObj = {};

      myJsonObj._id = req.params._id
      myJsonObj.username = username
      if(from != undefined) {
        myJsonObj.from = new Date(from).toDateString()
         }
      if(to != undefined) {
        myJsonObj.to = new Date(to).toDateString()
         }
      myJsonObj.count = logArr.length
      myJsonObj.log = logArr
      


/*
      for (let i=0; i < myJsonObj.log.length; i++) {                                      // working but useless
        myJsonObj.log[i].date = new Date(myJsonObj.log[i].date).toDateString();
      }

*/
      res.json(myJsonObj)
      } // if !err
    }) // Exercise find

    } // else for find by id
   
  }) // User find by id

}) // get end