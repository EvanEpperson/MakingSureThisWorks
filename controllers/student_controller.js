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

student.put('/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, foundStudent) => {
    res.redirect('/student')
  })
})

student.get('/:id/edit', (req, res) => {
  Student.findById(req.params.id, (error, foundStudent) => {
    res.render('student/studentedit.ejs', 
    { 
      data: foundStudent,
      currentUser: req.session.currentUser,
    })
  })
})

student.get("/", (req, res, next) => {
  Student.find({}, (err, allStudents) => {
    res.render("student/studentindex.ejs", {
      data: allStudents,
      currentUser: req.session.currentUser
    });
  });
});


student.get('/:index', (req, res) => {
    Student.findById(req.params.index, (err, allStudents) => {
        res.render('student/studentshow.ejs', {
            data: allStudents,
            currentUser: req.session.currentUser
        })
    })
})




student.get("/setup/seed", (req, res) => {
  Student.create(
    [
      {
        firstName: "Banu",
        lastName: "Tryon",
        specializations: "CSS BadAss",
        phone: "225",
        email: "nothing yet",
        time: "West Coast",
        image:
          "https://media-exp1.licdn.com/dms/image/C5603AQErZ1mG03VOuA/profile-displayphoto-shrink_800_800/0/1607619551717?e=1614816000&v=beta&t=Ds35diTR9tELCR4egU3xZD00QKuOZKMdhrNjpCZnhE4",
      },
      {
        firstName: "AJ",
        lastName: "Good Luck",
        specializations: "Super Back end , Linux ",
        phone: "224",
        email: "nothing yet ",
        time: "East Coast",
        image:
          "https://media-exp1.licdn.com/dms/image/C5103AQGfVPKYLl3uTw/profile-displayphoto-shrink_800_800/0/1516353900370?e=1614816000&v=beta&t=ElC4bhCKOp74KVKgqEUPVrmHOHhXXpVOEIZfC-oYk5Q",
      },
      {
        firstName: "Anthony",
        lastName: "Ku",
        specializations: "Monster",
        phone: "223",
        email: "nothing yet",
        time: "east Coast",
        image:
          "https://media-exp1.licdn.com/dms/image/C5603AQHNoePwicZHUQ/profile-displayphoto-shrink_800_800/0/1607029530909?e=1614816000&v=beta&t=yMzTg39Qt_vni0gEPlqT38Jg0fKtw32txmOhu4LYQCg",
      },
      {
        firstName: "Malik",
        lastName: "Ajose",
        specializations: "The CEO",
        phone: "222",
        email: "nothing yet",
        time: "West Coast",
        image:
          "https://media-exp1.licdn.com/dms/image/C5603AQFCBwYW9QawVA/profile-displayphoto-shrink_800_800/0/1606690666214?e=1614816000&v=beta&t=YdOyA8Odc9TvuSYqBy250rur-jOc50WSWqAHTK2BjXM",
      },
      {
        firstName: "Hunter",
        lastName: "Wallen",
        specializations: "Master of all things JS",
        phone: "222",
        email: "nothing yet",
        time: "East Coast",
        image:
          "https://media-exp1.licdn.com/dms/image/C5603AQGbZY3OCY0lKQ/profile-displayphoto-shrink_800_800/0/1607033788620?e=1614816000&v=beta&t=f4JO0qLiEPrg-ikeLgCmTxVwtlTnWpBi9kF5rtIk3OY",
      },
    ],
    (err, data) => {
      res.redirect("/student");
    }
  );
});
























module.exports = student