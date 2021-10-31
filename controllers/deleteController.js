const mongoose = require("mongoose");
const Message = require("./../utils/models/message");

const profileSchema = require("./../schemas/profile");

const profile = mongoose.model("profile", profileSchema);

exports.deleteService = (req, res, next) => {
  const serviceId = req.query.id;
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

exports.deleteFunFact = (req, res, next) => {
  const funfactId = req.query.id;
  profile
    .findById(req.session.user.profile)
    .then((profileR) => {
      profileR.funfacts.id(funfactId).remove();
      return profileR.save();
    })
    .then((profileR) => {
      if (profileR) {
        const message = new Message(
          "success",
          "Fun Fact Details deleted successfully."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      } else {
        const message = new Message(
          "error",
          "Fun Fact Details failed to delete please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      const message = new Message(
        "error",
        "Fun Fact Details failed to delete please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    });
};

exports.deleteEducation = (req, res, next) => {
  const educationId = req.query.id;
  profile
    .findById(req.session.user.profile)
    .then((profileR) => {
      profileR.educations.id(educationId).remove();
      return profileR.save();
    })
    .then((profileR) => {
      if (profileR) {
        const message = new Message(
          "success",
          "Educational Details deleted successfully."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      } else {
        const message = new Message(
          "error",
          "Educational Details failed to delete please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      const message = new Message(
        "error",
        "Educational failed to delete please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    });
};

exports.deleteExperience = (req, res, next) => {
  const experienceId = req.query.id;
  profile
    .findById(req.session.user.profile)
    .then((profileR) => {
      profileR.experiences.id(experienceId).remove();
      return profileR.save();
    })
    .then((profileR) => {
      if (profileR) {
        const message = new Message(
          "success",
          "Experience Details deleted successfully."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      } else {
        const message = new Message(
          "error",
          "Experience Details failed to delete please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      const message = new Message(
        "error",
        "Experience failed to delete please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    });
};

exports.deleteLanguage = (req, res, next) => {
  const languageId = req.query.id;
  profile
    .findById(req.session.user.profile)
    .then((profileR) => {
      profileR.languages.id(languageId).remove();
      return profileR.save();
    })
    .then((profileR) => {
      if (profileR) {
        const message = new Message(
          "success",
          "Languages Details deleted successfully."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      } else {
        const message = new Message(
          "error",
          "Languages Details failed to delete please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      const message = new Message(
        "error",
        "Languages failed to delete please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    });
};

exports.deleteCode = (req, res, next) => {
  const CodeId = req.query.id;
  profile
    .findById(req.session.user.profile)
    .then((profileR) => {
      profileR.codes.id(CodeId).remove();
      return profileR.save();
    })
    .then((profileR) => {
      if (profileR) {
        const message = new Message(
          "success",
          "Code Details deleted successfully."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      } else {
        const message = new Message(
          "error",
          "Code Details failed to delete please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      const message = new Message(
        "error",
        "Code failed to delete please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    });
};

exports.deleteMessage=(req,res,next)=>{
  const messageId=req.query.id;
  profile.findById(req.session.user.profile)
  .then(profileR=>{
    profileR.responses.id(messageId).remove();
    return profileR.save();
  }).then(profileR=>{
    if(profileR){
      const message = new Message(
        "success",
        "Message deleted successfully."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    }else{
      const message = new Message(
        "warn",
        "Message failed to delete."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    }
  }).catch(error=>{
    console.log(error);
    const message = new Message(
      "success",
      "Error occured while deleting message."
    );
    req.flash("message", message);
    res.redirect("/edit/updateProfile");
  });
}