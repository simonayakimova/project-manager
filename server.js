const express = require('express');

const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));




var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {


  app.set('myDb', client.db('projectManDb'));

})


app.put('/api/editTasks', function (req, res) {
  var changeTask = req.body
  console.log(changeTask)
    app.get('myDb').collection('toDoTasks').updateOne(
      // {"user":"user1"},
      {$set: {
          "task": changeTask.task,
          "description": changeTask.description
      }
      },
      function (err,dbResp) {
          if (err) {
              console.error(err)
          }
          if (dbResp.modifiedCount === 1) {
              res.json({ msg: "Successfully Amended"})
          } else {
              res.json({msg: "Not Found"})
          }
      })
})
  



app.post('/api/login',
  passport.authenticate('local'),
  function (req, res) {
    res.send(req.user);
  });

app.get('/api/logout', function (req, res) {
  req.logout();
  res.clearCookie('connect.sid', { path: '/' });
  req.session.destroy(function () {
    res.redirect('/Login');
  });
});

app.get('/api/getTasks', (req, res) => {

  app.get('myDb').collection('toDoTasks').find({}).toArray(function (err, docs) {
    if (err) {
      console.error(err)
    }
    res.json(docs)
  })
});

app.get('/api/users', (req, res) => {


  app.get('myDb').collection('users').find({}).toArray(function (err, docs) {
    if (err) {
      console.error(err)
    }

    res.json(docs)
  })
});

app.post('/api/tasks', (req, res) => {
  let newTask = req.body
  app.get('myDb').collection('toDoTasks').insertOne(newTask, function (err, docs) {
    if (err) {

      console.error(err)
    }

    res.json(docs)

  })

})

app.post('/api/signUp', (req, res) => {

  let newUser = req.body
  app.get('myDb').collection('login').insertOne(newUser, function (err, docs) {
    if (err) {
      console.error(err)
    }

    res.json(docs)


  })

})

// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

//   app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login' }));


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);