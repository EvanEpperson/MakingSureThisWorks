const bcrypt = require("bcrypt");
const express = require("express");
const admin = express.Router();
const Admin = require("../models/users.js");

admin.get("/new", (req, res) => {
  res.render("admin/admin.ejs", {
    currentUser: req.session.currentUser,
  });
});

admin.post("/", (req, res) => {
  req.body.username = bcrypt.hashSync(
      req.body.username,
      bcrypt.genSaltSync(10)
      ),
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  Admin.create(req.body, (err, createdAdmin) => {
    console.log("the user was created:", createdAdmin);
    res.redirect("/");
  });
});

module.exports = admin;
