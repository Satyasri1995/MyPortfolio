const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/MyPortfolio", (req, res, next) => {
  res.render("./pages/home", { login: true });
});

app.use("/", (req, res, next) => {
  res.render("./pages/createAccount");
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

