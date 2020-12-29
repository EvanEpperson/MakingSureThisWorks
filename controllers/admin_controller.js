const bcrypt = require("bcrypt");
const express = require("express");
const admin = express.Router();
const Admin = require("../models/admin.js");

admin.get("/new", (req, res) => {
  res.render("admin/admin.ejs", {
    currentAdmin: req.session.currentAdmin,
  });
});

admin.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  Admin.create(req.body, (err, createdAdmin) => {
    console.log("the user was created:", createdAdmin);
    res.redirect("/");
  });
});
   




//testing

module.exports = admin;
