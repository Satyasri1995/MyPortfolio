const profileSchema = require("./../schemas/profile");
const mongoose = require("mongoose");
const Message = require("./../utils/models/message");

const About = require("./../utils/models/about");
const BasicDetails = require("./../utils/models/basicDetails");
const Service = require("./../utils/models/service");
const Code = require("./../utils/models/code");
const Education = require("./../utils/models/education");
const Experience = require("./../utils/models/experience");
const FunFact = require("./../utils/models/funfact");
const Language = require("./../utils/models/language");

const profile = mongoose.model("profile", profileSchema);

exports.viewProfile = (req, res, next) => {
  const profileId = req.session.user ? req.session.user.profile : req.query.id;
  profile
    .findById(profileId)
    .populate("user")
    .lean()
    .exec()
    .then((profileR) => {
      const profile = {
        id: profileId,
        basicDetails: { ...new BasicDetails() },
        about: new About(),
        services: [{ ...new Service(), _id: null }],
        codes: [{ ...new Code(), _id: null }],
        educations: [{ ...new Education(), _id: null }],
        experiences: [{ ...new Experience(), _id: null }],
        funfacts: [{ ...new FunFact(), _id: null }],
        languages: [{ ...new Language(), _id: null }],
        quote: null,
      };
      if (profileR) {
        Object.keys(profileR.user).forEach((key) => {
          if (profile.basicDetails.hasOwnProperty(key)) {
            profile.basicDetails[key] = profileR.user[key];
          }
        });
        Object.keys(profileR.about).forEach((key) => {
          if (profile.about.hasOwnProperty(key)) {
            profile.about[key] = profileR.about[key];
          }
        });
        if (profileR.services.length) {
          profile.services = profileR.services;
        }
        if (profileR.codes.length) {
          profile.codes = profileR.codes;
        }
        if (profileR.educations.length) {
          profile.educations = profileR.educations;
        }
        if (profileR.experiences.length) {
          profile.experiences = profileR.experiences;
        }
        if (profileR.funfacts.length) {
          profile.funfacts = profileR.funfacts;
        }
        if (profileR.languages.length) {
          profile.languages = profileR.languages;
        }
        if (profileR.quote) {
          profile.quote = profileR.quote;
        }
        if (profileR.inprogress.score == 100) {
          const message = req.flash("message")[0];
          res.render("./../views/pages/home", {
            message: message ? message : {},
            profile: profile,
          });
        } else {
          const message = new Message(
            "warn",
            "Please complete following sections " +
              profileR.inprogress.items +
              " to unlock your profile page"
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      } else {
        message = new Message("warn", "Profile Not Found");
        req.flash("message", message);
        res.redirect("/auth/signin");
      }
    })
    .catch((error) => {
      console.log(error);
      message = new Message("error", "Profile Not Found");
      req.flash("message", message);
      res.redirect("/auth/signin");
    });
};

exports.isProfileReady = (req, res, next) => {
  const profileId = req.session.user ? req.session.user.profile : req.query.id;
  if (profileId !== "") {
    profile
      .findById(profileId)
      .populate("user")
      .exec()
      .then((profileR) => {
        if (profileR) {
          const cp = 11.11111111111111;
          const items = [];
          let score = 0;
          if (!profileR.user.name) {
            items.push("Basic Details");
            score += cp;
          }
          if (!profileR.about._id) {
            items.push("About Details");
            score += cp;
          }
          if (profileR.codes.length == 0) {
            items.push("Code Details");
            score += cp;
          }
          if (profileR.educations.length == 0) {
            items.push("Education Details");
            score += cp;
          }
          if (profileR.experiences.length == 0) {
            items.push("Experience Details");
            score += cp;
          }
          if (profileR.funfacts.length == 0) {
            items.push("Fun Facts Details");
            score += cp;
          }
          if (profileR.codes.length == 0) {
            items.push("Language Details");
            score += cp;
          }
          if (profileR.codes.length == 0) {
            items.push("Services Details");
            score += cp;
          }
          if (profileR.codes.length == 0) {
            items.push("Quote Details");
            score += cp;
          }
          profileR.inprogress.items = items;
          profileR.inprogress.score = 100 - score;
          return profileR.save();
        } else {
          return null;
        }
      })
      .then((profileR) => {
        if (profileR) {
          next();
        } else {
          const message = new Message("error", "Profile Not Found...!");
          req.flash("message", message);
          res.redirect("/auth/signin");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Error occured Profile Not Found...!"
        );
        req.flash("message", message);
        res.redirect("/auth/signin");
      });
  } else {
    const message = new Message("error", "Invalid Profile ID...!");
    req.flash("message", message);
    res.redirect("/auth/signin");
  }
};
