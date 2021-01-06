// const { escapeXML } = require('ejs');
const express = require('express');
const Main = require('../models/main.js')
const main = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/users/new");
  }
};


main.delete("/:id", (req, res) => {
  Main.findByIdAndRemove(req.params.id, (error, deletedTeacher) => {
    res.redirect("/main");
  });
});

main.get('/',  (req, res) => {
    Main.find({}, (err, allMains) => {
           res.render("main/index.ejs", 
           {
             data: allMains,
             currentUser: req.session.currentUser,
             currentAdmin: req.session.currentAdmin
           });
    })
})

main.get("/:index",  (req, res) => {
  Main.findById(req.params.index, (err, allMains) => {
    res.render("main/show.ejs", {
      data: allMains,
      currentUser: req.session.currentUser,
      currentAdmin: req.session.currentAdmin
    });
  });
});


main.get('/setup/seed', (req, res) => {
    Main.create(
      [
        {
          firstName: "Matt",
          lastName: "Huntington",
          specializations: "Coded the World in 6 days and on the 7th he rested. ",
          phone: "225",
          email: "nothing yet",
          time: "east coast",
          image:
            "https://media-exp1.licdn.com/dms/image/C5603AQHpFVJPAnrOmw/profile-displayphoto-shrink_800_800/0/1598280158233?e=1614211200&v=beta&t=9oPg75Pdb6UsIEkjSZGbXAK9-cQi733tbjOIENCui1s",
          imagea:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkxtbviCaL2IHaeTGsvzF9STDJcqLIWRj1kw&usqp=CAU",
          imageb:
            "https://media1.tenor.com/images/49fc1124c648a419e536903d3f9492b2/tenor.gif?itemid=13987172",
        },
        {
          firstName: "Jerrica ",
          lastName: "Bobadilla",
          specializations: "Created Bootstrap and then stopped using it. ",
          phone: "224",
          email: "nothing yet ",
          time: "west coast",
          image:
            "https://media-exp1.licdn.com/dms/image/C4D03AQEI1pYFVP34hg/profile-displayphoto-shrink_800_800/0/1517038693917?e=1614211200&v=beta&t=YdeNjighsMNv7DDBUvVClAgIbIFSL0Ht6WG2agboDvc",
          imagea:
            "https://d2sis3lil8ndrq.cloudfront.net/books/3b63423f-d0e2-4446-8a45-cab2cf783551.png",
          imageb: "https://media1.giphy.com/media/13FrpeVH09Zrb2/giphy.gif",
        },
        {
          firstName: "Brendan ",
          lastName: "Quirk",
          specializations: "Thomas the Train has nothing on Brendan when coding on Rails",
          phone: "223",
          email: "nothing yet",
          time: "east Coast",
          image:
            "https://media-exp1.licdn.com/dms/image/C4D03AQGiEssONa97gQ/profile-displayphoto-shrink_800_800/0/1543885252192?e=1614211200&v=beta&t=RyPDYHs0AE0sW89PPM7GnbEIlqWl-0WBo012Q2Kk1do",
          imagea:
            "https://cloudinary-res.cloudinary.com/image/upload/c_fill,w_770/dpr_3.0,f_auto,fl_lossy,q_auto/Animations_with_HTML5_2000x1100_v2.gif",
          imageb: "https://media1.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
        },
        {
          firstName: "Leland ",
          lastName: "Shirley",
          specializations: "Can code faster than Jordan Walke at React while coding in Vanilla JavaScript.",
          phone: "222",
          email: "nothing yet",
          time: "West Coast",
          image:
            "https://media-exp1.licdn.com/dms/image/C4E03AQFyGup6DfMYlQ/profile-displayphoto-shrink_800_800/0/1603986133745?e=1614211200&v=beta&t=_mIaNje3PFZwq-TiKr8Dl9P363YUh6qPcG69rgtB7ak",
          imagea:
            "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1492203966/articles/2013/12/12/i-took-the-one-hour-of-code-challenge/131210-coding-for-dummies-tease_ohllsl",
          imageb: "https://media2.giphy.com/media/3ornjIhZGFWpbcGMAU/200.gif",
        },
      ],
      (err, data) => {
        res.redirect("/main");
      }
    );
})






















//
module.exports = main 