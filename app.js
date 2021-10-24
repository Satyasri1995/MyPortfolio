const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const authRoutes = require('./routes/auth');

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");


app.use('/auth',authRoutes);

app.use("/MyPortfolio", (req, res, next) => {
  res.render("./pages/home", { login: true });
});

app.use("/", (req, res, next) => {
  res.render("./pages/account" ,{
    login:true,
    message:{
      status:'error',
      content:'Testing tthe message...!'
    }
  });
});

app.listen(3000)

// mongoose
//   .connect(
//     "mongodb+srv://SatyaApps:Satyasri1995@cluster0.ltyvt.mongodb.net/MyPortfolio?retryWrites=true&w=majority"
//   )
//   .then((result) => {
//     app.listen(3000);
//     console.log('Connected to Database !...');
//   })
//   .catch((error) => {
//     console.log(error);
//   });

