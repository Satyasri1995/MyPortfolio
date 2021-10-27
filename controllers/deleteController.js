const mongoose = require("mongoose");
const Message = require('./../utils/models/message');

const profileSchema = require("./../schemas/profile");

const profile = mongoose.model("profile", profileSchema);

exports.deleteService = (req, res, next) => {
  const serviceId = req.query.id;
  console.log(serviceId,'delete')
  profile
    .findById(req.session.user.profile)
    .then((profileR) => {
      profileR.services.id(serviceId).remove();
      return profileR.save();
    })
    .then((profileR) => {
      if (profileR) {
        const message = new Message(
          "success",
          "Service Details deleted successfully."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      } else {
        const message = new Message(
          "error",
          "Service Details failed to delete please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      const message = new Message(
        "error",
        "Service Details failed to delete please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    });
};
