const bcrypt = require("bcrypt");
const express = require("express");
const adminsession = express.Router();
const Admin = require("../models/admin.js");

adminsession.get("/new", (req, res) => {
  res.render("adminsessions/new.ejs", {
    currentAdmin: req.session.currentAdmin,
  });
});

adminsession.post("/", (req, res) => {
  Admin.findOne({ username: req.body.username }, (err, foundAdmin) => {
    if (err) {
      console.log(err);
      res.send("oops the db had a problem");
    } else if (!foundAdmin) {
      res.send('<a  href="/">Please Create A New Account </a>');
    } else {

      if (
        bcrypt.compareSync(req.body.username, foundAdmin.username),(
          req.body.password,
          foundAdmin.password
        )
      ) {
        req.session.currentAdmin = foundAdmin;
        res.redirect("/");
      } else {
        res.send(`<a href="/"> Your Password Isn't Matching </a>`);
      }
    }
  });
});

adminsession.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = adminsession;
