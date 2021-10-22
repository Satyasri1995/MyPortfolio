const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/MyPortfolio", (req, res, next) => {
  res.render("./pages/home",{login:true});
});

app.use("/", (req, res, next) => {
    res.redirect("./MyPortfolio")
});


app.listen(3000);
