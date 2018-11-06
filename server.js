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

app.put('/api/addComments', function (req, res) {
  var newComment = req.body
  let id = parseInt(newComment.id)

  app.get('myDb').collection('toDoTasks').updateOne(
    {"id": id},
    {$set: {
        "comments": newComment.comments
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

app.put('/api/addBlocker', function (req, res) {
  var isBlocked = req.body
  let id = parseInt(isBlocked.id)

  app.get('myDb').collection('toDoTasks').updateOne(
    {"id": id},
    {$set: {
        "isBlocked": isBlocked.isBlocked
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


app.put('/api/editDescription', function (req, res) {
  var changeTask = req.body
  let id = parseInt(changeTask.id)
  
    app.get('myDb').collection('toDoTasks').updateOne(
      {"id": id},
      {$set: {
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

app.put('/api/editTitle', function (req, res) {
  var changeTask = req.body
  console.dir(changeTask)
  let id = parseInt(changeTask.id)
  console.log(changeTask)
    app.get('myDb').collection('toDoTasks').updateOne(
      {"id": id},
      {$set: {
          "title": changeTask.title
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

app.put('/api/editType', function (req, res) {
  var changeTask = req.body
  console.dir(changeTask)
  let id = parseInt(changeTask.id)
  console.log(changeTask)
    app.get('myDb').collection('toDoTasks').updateOne(
      {"id": id},
      {$set: {
          "type": changeTask.type
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


app.put('/api/getTasks', function (req, res) {
// app.get('/api/getTasks', (req, res) => {

  project = req.body.project

  app.get('myDb').collection('toDoTasks').find({"project":project}).toArray(function (err, docs) {
    if (err) {
      console.error(err)
    }
    res.json(docs)
  })
});



app.delete('/api/deleteDone', function (req, res) {
    var removeTask = req.body;
    var id = parseInt(removeTask.id);
    app.get('myDb').collection("toDoTasks").deleteOne(
        { "id": id },
        function (err, dbResp) {
            if (err) {
                console.error(err)
            }
            if (dbResp.deletedCount === 1) {
                res.json({ msg: "Successfully Removed" })
            } else {
                res.json({ msg: "Not Found" })
            }
        })
  }
)




app.get('/api/getLastId', (req, res) => {

  app.get('myDb').collection('toDoTasks').find({}).limit(1).sort({$natural:-1}).toArray(function (err, docs) {
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


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);