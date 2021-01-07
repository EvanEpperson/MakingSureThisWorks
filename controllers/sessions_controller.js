const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');
// not using this for sessions anymore because i have it all in users but i still need the second part
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', 
    {
        currentUser: req.session.currentUser
    })
})
// what actually makes the session happen when it sees the same username created before hand 
sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send("oops the db had a problem");
    } else if (!foundUser) {
      res.send('<a  href="/">Please Create A New Account </a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect('/');
      } else {
        res.send(`<a href="/"> Your Password Isn't Matching </a>`);
      }
    }
  });
});



sessions.delete('/', (req, res) => {
    req.session.destroy((() => {
        res.redirect('/')
    }))
})






module.exports = sessions