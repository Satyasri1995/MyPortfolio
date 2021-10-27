const About = require("./../utils/models/about");
const BasicDetails = require("./../utils/models/basicDetails");
const Service = require("./../utils/models/service");
const Code = require("./../utils/models/code");
const Education = require("./../utils/models/education");
const Experience = require("./../utils/models/experience");
const FunFact = require("./../utils/models/funfact");
const Language = require("./../utils/models/language");
const Message = require("./../utils/models/message");

const mongoose = require("mongoose");

const profileSchema = require("./../schemas/profile");
const userSchema = require("./../schemas/user");
const serviceSchema = require("./../schemas/service");

const profile = mongoose.model("profile", profileSchema);
const user = mongoose.model("user", userSchema);
const service = mongoose.model("service", serviceSchema);

exports.editPage = (req, res, next) => {
  profile
    .findById(req.session.user.profile)
    .populate("user")
    .lean()
    .exec()
    .then((profileR) => {
      const cp = 11.11111111111111;
      const profile = {
        id: req.session.user.profile,
        basicDetails: { ...new BasicDetails() },
        about: new About(),
        services: [{ ...new Service(), _id: null }],
        codes: [{ ...new Code(), _id: null }],
        educations: [{ ...new Education(), _id: null }],
        experiences: [{ ...new Experience(), _id: null }],
        funfacts: [{ ...new FunFact(), _id: null }],
        languages: [{ ...new Language(), _id: null }],
        quote: null,
        complete: 0,
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
          profile.complete += cp;
        }
        if (profileR.codes.length) {
          profile.codes = profileR.codes;
          profile.complete += cp;
        }
        if (profileR.educations.length) {
          profile.educations = profileR.educations;
          profile.complete += cp;
        }
        if (profileR.experiences.length) {
          profile.experiences = profileR.experiences;
          profile.complete += cp;
        }
        if (profileR.funfacts.length) {
          profile.funfacts = profileR.funfacts;
          profile.complete += cp;
        }
        if (profileR.languages.length) {
          profile.languages = profileR.languages;
          profile.complete += cp;
        }
        if (profileR.quote) {
          profile.quote = profileR.quote;
          profile.complete += cp;
        }
      }
      const message = req.flash("message")[0];
      res.render("./../views/pages/editPage", {
        message: message ? message : {},
        profile: profile,
      });
    });
};

exports.editBasicDetails = (req, res, next) => {
  const basicDetails = new BasicDetails(
    req.body.name,
    req.body.stack,
    req.body.email,
    req.body.phone,
    req.body.phone_alt,
    req.body.location
  );
  user
    .findById(req.session.user)
    .then((userR) => {
      userR.name = basicDetails.name;
      userR.stack = basicDetails.stack;
      userR.email = basicDetails.email;
      userR.phone = basicDetails.phone;
      userR.phone_alt = basicDetails.phone_alt;
      userR.location = basicDetails.location;
      return userR.save();
    })
    .then((userR) => {
      if (userR) {
        const message = new Message(
          "success",
          "Basic Details saved successfully."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      } else {
        const message = new Message(
          "error",
          "Basic Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      const message = new Message(
        "error",
        "Basic Details failed to save please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    });
};

exports.editAbout = (req, res, next) => {
  const about = new About(
    req.body.profile_summary,
    req.body.age,
    req.body.gender,
    req.body.residence,
    req.body.address
  );

  profile
    .findById(req.session.user.profile)
    .then((profileR) => {
      profileR.about.profile_summary = about.profile_summary;
      profileR.about.age = about.age;
      profileR.about.gender = about.gender;
      profileR.about.residence = about.residence;
      profileR.about.address = about.address;
      return profileR.save();
    })
    .then((profileR) => {
      if (profileR) {
        const message = new Message(
          "success",
          "About Details saved successfully."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      } else {
        const message = new Message(
          "error",
          "About Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      }
    })
    .catch((error) => {
      console.log(error);
      const message = new Message(
        "error",
        "Basic Details failed to save please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    });
};

exports.editEducation = (req, res, next) => {
  const message = req.flash("message")[0];
  res.redirect("/edit/editPage");
};

exports.editService = (req, res, next) => {
  const serviceId = req.query.id;
  const serviceDetails = new Service(
    req.body.icon,
    req.body.title,
    req.body.description
  );
  console.log(serviceId);
  if (serviceId == "") {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.services.push(serviceDetails);
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Service Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Service Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Service Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  } else {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.services.id(serviceId).icon = serviceDetails.icon;
        profileR.services.id(serviceId).title = serviceDetails.title;
        profileR.services.id(serviceId).description =
          serviceDetails.description;
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Service Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Service Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Service Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  }
};
