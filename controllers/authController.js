const mongoose = require('mongoose');
const messageModel = require("./../utils/models/message");
const BasicDetails=require('./../utils/models/basicDetails');

const userSchema = require("./../schemas/user");
const profileSchema = require("./../schemas/profile");

const user = mongoose.model('user',userSchema);
const profile = mongoose.model('profile',profileSchema);


exports.login = (req, res, next) => {
  const { email, password } = { ...req.body };
  let message;
  user
    .findOne({
      email: email,
      password: password,
    })
    .then((userR) => {
      if (!userR) {
        message = new messageModel(
          "info",
          "No Account found please create a new Accoount."
        );
        req.flash("message", message);
        res.redirect("/auth/createAccount");
      } else {
        req.session.user = userR;
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      message = new messageModel("error", "Invalid username or password");
      req.flash("message", message);
      res.redirect("/auth/signin");
    });
};

exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  let message;
  if (password === confirm_password) {
    const userM = new user();
    const profileM = new profile();
    const basicDetails = new BasicDetails(
      null,
      null,
      email,
      null,
      null,
      null
    );
    userM.email = basicDetails.email;
    userM.password = password;
    userM.profile = profileM;
    userM.name=basicDetails.name;
    userM.stack=basicDetails.stack;
    userM.phone=basicDetails.stack;
    userM.phone_alt=basicDetails.phone_alt;
    userM.location=basicDetails.location;
    userM
      .save()
      .then((userR) => {
        profileM.user = userR;
        return profileM.save();
      })
      .then((profileR) => {
        message = new messageModel(
          "success",
          "Account created please login with your credentials."
        );
        req.flash("message", message);
        res.redirect("/auth/loginPage");
      })
      .catch((error) => {
        console.log(error);
        message = new messageModel("error", "Database error");
        req.flash("message", message);
        res.redirect("/auth/createAccount");
      });
  } else {
    message = new messageModel(
      "error",
      "Password and confirm password does not match."
    );
    req.flash("message", message);
    res.redirect("/auth/createAccount");
  }
};

exports.loginPage = (req, res, next) => {
  const message = req.flash("message")[0];
  res.render("./pages/account", {
    showLogin: true,
    message: message ? message : {},
  });
};

exports.registerPage = (req, res, next) => {
  const message = req.flash("message")[0];
  res.render("./pages/account", {
    showLogin: false,
    message: message ? message : {},
  });
};
