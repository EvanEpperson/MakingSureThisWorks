// const { escapeXML } = require('ejs');
const express = require('express');
const Main = require('../models/main.js')
const main = express.Router()

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

main.get('/', (req, res) => {
    Main.find({}, (err, allMains) => {
           res.render("main/index.ejs", {
             data: allMains,
             currentUser: req.session.currentUser
           });
    })
})

main.get('/:index', (req, res) => {
    Main.findById(req.params.index, (err, allMains) => {
    res.render("main/show.ejs", 
    {
      data: allMains,
      currentUser: req.session.currentUser
    });
    })
})


main.get('/setup/seed', (req, res) => {
    Main.create(
      [
        {
          firstName: "Matt",
          lastName: "Huntington",
          specializations: "badass",
          phone: "225",
          email: "nothing yet",
          time: "east coast",
          image:
            "https://media-exp1.licdn.com/dms/image/C5603AQHpFVJPAnrOmw/profile-displayphoto-shrink_800_800/0/1598280158233?e=1614211200&v=beta&t=9oPg75Pdb6UsIEkjSZGbXAK9-cQi733tbjOIENCui1s",
        },
        {
          firstName: "Jerrica ",
          lastName: "Bobadilla",
          specializations: "css",
          phone: "224",
          email: "nothing yet ",
          time: "west coast",
          image:
            "https://media-exp1.licdn.com/dms/image/C4D03AQEI1pYFVP34hg/profile-displayphoto-shrink_800_800/0/1517038693917?e=1614211200&v=beta&t=YdeNjighsMNv7DDBUvVClAgIbIFSL0Ht6WG2agboDvc",
        },
        {
          firstName: "Brendan ",
          lastName: "Quirk",
          specializations: "js",
          phone: "223",
          email: "nothing yet",
          time: "east Coast",
          image:
            "https://media-exp1.licdn.com/dms/image/C4D03AQGiEssONa97gQ/profile-displayphoto-shrink_800_800/0/1543885252192?e=1614211200&v=beta&t=RyPDYHs0AE0sW89PPM7GnbEIlqWl-0WBo012Q2Kk1do",
        },
        {
          firstName: "Leland ",
          lastName: "Shirley",
          specializations: "teaching fast",
          phone: "222",
          email: "nothing yet",
          time: "West Coast",
          image:
            "https://media-exp1.licdn.com/dms/image/C4E03AQFyGup6DfMYlQ/profile-displayphoto-shrink_800_800/0/1603986133745?e=1614211200&v=beta&t=_mIaNje3PFZwq-TiKr8Dl9P363YUh6qPcG69rgtB7ak",
        },
      ],
      (err, data) => {
        res.redirect("/main");
      }
    );
})






















//
module.exports = main 