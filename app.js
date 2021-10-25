const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require('express-session');
const flash = require('connect-flash');


const authRoutes = require('./routes/auth');
const editRoutes = require('./routes/edit');

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret:'mysecret',resave:false,saveUninitialized:false}));
app.use(flash());

app.set("view engine", "ejs");
app.set("views", "views");


app.use('/auth',authRoutes);
app.use('/edit',editRoutes);

app.use("/MyPortfolio", (req, res, next) => {
  res.render("./pages/home", { login: true });
});

app.use("/", (req, res, next) => {
  res.redirect('/auth/signin');
});

mongoose
  .connect(
    "mongodb+srv://SatyaApps:Satyasri1995@cluster0.ltyvt.mongodb.net/MyPortfolio?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
    console.log('Connected to Database !...');
  })
  .catch((error) => {
    console.log(error);
  });

