const user = require("./../models/user");

exports.login = (req, res, next) => {
  const { email, password } = { ...req.body };
  user
    .findOne({
      email: email,
      password: password,
    })
    .then((result) => {
      if (!result) {
        res.redirect("/auth/register");
      } else {
        res.redirect("/MyPortfolio");
      }
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/auth/login");
    });
};

exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  if (password === confirm_password) {
    const user = new user();
    user.email = email;
    user.password = password;
    user.save().then((result) => {
      res.redirect("/auth/login");
    });
  } else {
    res.redirect("/auth/register");
  }
};
