const Message = require("./../utils/models/message");

exports.errorController = (req, res, next, error) => {
  if (error) {
    console.log(error);
    const message = new Message("error", "Something went wrong");
    req.flash("message", message);
    res.redirect("/edit/updateProfile");
  }
};
