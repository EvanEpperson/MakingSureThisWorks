const express = require('express');
const Student = require('../models/student.js')
const student = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

student.get("/students", isAuthenticated, (req, res, next) => {
  Student.find({}, (err, allStudentss) => {
    res.render("main/newstudents.ejs", {
      data: allStudents,
      currentUser: req.session.currentUser,
    });
  });
});















module.exports = student