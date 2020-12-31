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

const admin = (req, res, next) => {
  if(req.session.currentAdmin){
    return next();
  }else{
    res.redirect('/adminsessions/new')
    // put it to a new folder to fill out for admins to edit things around 
  }
}

student.put('/:id', admin, (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, foundStudent) => {
    res.redirect('/student')
  })
})

student.get('/editrequestform', (req, res) => {
  res.render('student/studentContact.ejs', 
  {
    currentAdmin: req.session.currentAdmin
  })
})

student.get('/:id/edit', admin, (req, res) => {
  Student.findById(req.params.id, (error, foundStudent) => {
    res.render('student/studentedit.ejs', 
    { 
      data: foundStudent,
      currentUser: req.session.currentUser,
      currentAdmin: req.session.currentAdmin
    })
  })
})

student.get("/", (req, res, next) => {
  Student.find({}, (err, allStudents) => {
    res.render("student/studentindex.ejs", {
      data: allStudents,
      currentUser: req.session.currentUser,
      currentAdmin: req.session.currentAdmin
    });
  });
});


student.get('/:index', (req, res) => {
    Student.findById(req.params.index, (err, allStudents) => {
        res.render('student/studentshow.ejs', {
            data: allStudents,
            currentUser: req.session.currentUser,
            currentAdmin: req.session.currentAdmin
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
        imagea:
          "https://miro.medium.com/max/2560/1*v0VfsQyWTJ-5eOo5kcjfLg@2x.jpeg",
        imageb:
          "https://nypost.com/wp-content/uploads/sites/2/2019/01/cali-state-park.jpg?quality=80&strip=all",
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
        imagea:
          "https://upload.wikimedia.org/wikipedia/commons/9/9f/Vimlogo.svg",
        imageb:
          "https://www.jeremymorgan.com/images/pop-os-linux/pop-os-linux-og.jpg",
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
        imagea:
          "https://i.pinimg.com/originals/24/0b/bb/240bbb8b6e90cb1a0ac5165c2dd6fc27.jpg",
        imageb:
          "https://media.tenor.com/images/6e7c95cea52bcc146ac671742c8f1ad5/tenor.gif",
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