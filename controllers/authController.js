const user = require("./../models/user");
const messageModel = require("./../utils/models/message");

exports.login = (req, res, next) => {
  const { email, password } = { ...req.body };
  let message;
  user
    .findOne({
      email: email,
      password: password,
    })
    .then((result) => {
      if (!result) {
        res.redirect("/auth/createAccount");
      } else {
        console.log("Invalid");
        message = new messageModel("error", "Invalid username or password");
        req.flash("message", message);
        res.redirect("/MyPortfolio");
      }
    })
    .catch((error) => {
      console.log(error);
      message = new messageModel("error", "Invalid username or password");
      req.flash("message", message);
      res.redirect("/auth/login");
    });
};

exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  let message;
  if (password === confirm_password) {
    const userM = new user();
    userM.email = email;
    userM.password = password;
    userM.save().then((result) => {
      message = new messageModel(
        "success",
        "Account created please login with your credentials."
      );
      req.flash("message", message);
      res.redirect("/auth/loginPage");
    }).catch(error=>{
      message = new messageModel(
        "error",
        "Database error"
      );
      req.flash("message", message);
      res.redirect("/auth/createAccount");
    });
  } else {
    message = new messageModel(
      "error",
      "Something went wrong please try again."
    );
    req.flash("message", message);
    res.redirect("/auth/createAccount");
  }
};

exports.loginPage = (req, res, next) => {
  const message=req.flash('message')[0];
  res.render("./pages/account", {
    showLogin: true,
    message:message?message:{}
  });
};

exports.registerPage = (req, res, next) => {
  const message=req.flash('message')[0];
  res.render("./pages/account", {
    showLogin: false,
    message:message?message:{}
  });
};
