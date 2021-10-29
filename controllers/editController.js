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

const profile = mongoose.model("profile", profileSchema);
const user = mongoose.model("user", userSchema);

exports.editPage = (req, res, next) => {
  profile
    .findById(req.session.user.profile)
    .populate("user")
    .lean()
    .exec()
    .then((profileR) => {
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
        inprogress: {},
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
        profile.inprogress=profileR.inprogress;
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

exports.editService = (req, res, next) => {
  const serviceId = req.query.id;
  const serviceDetails = new Service(
    req.body.icon,
    req.body.title,
    req.body.description
  );
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

exports.editFunFact = (req, res, next) => {
  const funfactId = req.query.id;
  const funfactDetails = new FunFact(req.body.icon, req.body.title);
  if (funfactId == "") {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.funfacts.push(funfactDetails);
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Fun Facts Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Fun Facts Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Fun Facts Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  } else {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.funfacts.id(funfactId).icon = funfactDetails.icon;
        profileR.funfacts.id(funfactId).title = funfactDetails.title;
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Fun Facts Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Fun Facts Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Fun Facts Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  }
};

exports.editEducation = (req, res, next) => {
  const educationId = req.query.id;
  const educationDetails = new Education(
    req.body.start,
    req.body.end,
    req.body.school,
    req.body.location,
    req.body.description
  )
  if (educationId == "") {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.educations.push(educationDetails);
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Education Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Education Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Education Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  } else {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.educations.id(educationId).start = educationDetails.start;
        profileR.educations.id(educationId).end = educationDetails.end;
        profileR.educations.id(educationId).school = educationDetails.school;
        profileR.educations.id(educationId).location = educationDetails.location;
        profileR.educations.id(educationId).description = educationDetails.description;
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Education Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Education Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Education Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  }
};

exports.editExperience = (req, res, next) => {
  const experienceId = req.query.id;
  const experienceDetails = new Experience(
    req.body.start,
    req.body.end,
    req.body.organisation,
    req.body.job,
    req.body.description
  )
  if (experienceId == "") {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.experiences.push(experienceDetails);
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Experience Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Experience Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Experience Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  } else {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.experiences.id(experienceId).start = experienceDetails.start;
        profileR.experiences.id(experienceId).end = experienceDetails.end;
        profileR.experiences.id(experienceId).organisation = experienceDetails.organisation;
        profileR.experiences.id(experienceId).job = experienceDetails.job;
        profileR.experiences.id(experienceId).description = experienceDetails.description;
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Experience Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Experience Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Experience Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  }
};

exports.editLanguage = (req, res, next) => {
  const languageId = req.query.id;
  const languageDetails = new Language(
    req.body.language,
    req.body.speak,
    req.body.read,
    req.body.write,
  )
  if (languageId == "") {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.languages.push(languageDetails);
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Language Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Language Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Language Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  } else {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.languages.id(languageId).language = languageDetails.language;
        profileR.languages.id(languageId).speak = languageDetails.speak;
        profileR.languages.id(languageId).read = languageDetails.read;
        profileR.languages.id(languageId).write = languageDetails.write;
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Language Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Language Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Language Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  }
};

exports.editCode = (req, res, next) => {
  const codeId = req.query.id;
  const codeDetails = new Code(
    req.body.icon,
    req.body.title,
    req.body.star,
  )
  if (codeId == "") {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.codes.push(codeDetails);
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Code Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Code Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Code Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  } else {
    profile
      .findById(req.session.user.profile)
      .then((profileR) => {
        profileR.codes.id(codeId).icon = codeDetails.icon;
        profileR.codes.id(codeId).title = codeDetails.title;
        profileR.codes.id(codeId).star = codeDetails.star;
        return profileR.save();
      })
      .then((profileR) => {
        if (profileR) {
          const message = new Message(
            "success",
            "Code Details saved successfully."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        } else {
          const message = new Message(
            "error",
            "Code Details failed to save please try again."
          );
          req.flash("message", message);
          res.redirect("/edit/updateProfile");
        }
      })
      .catch((error) => {
        console.log(error);
        const message = new Message(
          "error",
          "Code Details failed to save please try again."
        );
        req.flash("message", message);
        res.redirect("/edit/updateProfile");
      });
  }
};

exports.editQuote=(req,res,next)=>{
  const quote = req.body.quote;
  profile.findById(req.session.user.profile)
  .then(profileR=>{
    profileR.quote=quote;
    return profileR.save();
  }).then(profileR=>{
    if (profileR) {
      const message = new Message(
        "success",
        "Quote Details saved successfully."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    } else {
      const message = new Message(
        "error",
        "Quote Details failed to save please try again."
      );
      req.flash("message", message);
      res.redirect("/edit/updateProfile");
    }
  }).catch(error=>{
    console.log(error);
    const message = new Message(
      "error",
      "Quote Details failed to save please try again."
    );
    req.flash("message", message);
    res.redirect("/edit/updateProfile");
  })
}