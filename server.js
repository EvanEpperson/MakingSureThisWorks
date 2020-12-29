const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
require("dotenv").config();
const session = require("express-session");


const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});




////////////////////////////////////////////////////////////////////
// middleware
///////////////////////////////////////////////////////////////////
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
  })
);


db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));


////////////////////////////////////////////////////////////////////
//Controllers
///////////////////////////////////////////////////////////////////
const mainController = require('./controllers/main_controller.js')
app.use('/main', mainController)
const userController = require("./controllers/users_controllers.js")
app.use('/users', userController)
const sessionsController = require("./controllers/sessions_controller.js");
app.use('/sessions', sessionsController)
const studentController = require("./controllers/student_controller.js")
app.use('/student', studentController)
const adminController = require("./controllers/admin_controller.js")
app.use('/admin', adminController)
const adminsessionsController = require("./controllers/adminsessions_controller.js")
app.use('/adminsessions', adminsessionsController)


///////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.redirect('/main')
})

app.get('/testing/admin', (req, res) => {
  res.redirect(
    "https://account.mongodb.com/account/login?n=%2Fv2%2F5fe20b3ef1acbf50288c661c&nextHash=%23clusters"
  );
})
////////////////////////////////////////////////////////////////////
//Listener
////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});


