const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require('express-session');
const flash = require('connect-flash');


const authRoutes = require('./routes/auth');
const editRoutes = require('./routes/edit');
const deleteRoute = require('./routes/delete');
const profileRoute = require('./routes/profile');

const errorController=require('./controllers/errorController');

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
app.use('/delete',deleteRoute);
app.use('/profile',profileRoute);

app.use("/", (req, res, next) => {
  res.redirect('/auth/signin');
});

app.use(errorController.errorController);

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

