const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aboutSchema = require('./about');
const codeSchema = require('./code');
const educationSchema = require('./education');
const experienceSchema = require('./experience');
const funfactSchema = require('./funfact');
const languageSchema = require('./language');
const serviceSchema = require('./service');

const profileSchema = new Schema({
  user:{
      type:mongoose.SchemaTypes.ObjectId,
      required:true,
      ref:'user'
  },
  about:aboutSchema,
  codes:[codeSchema],
  educations:[educationSchema],
  experiences:[experienceSchema],
  funfacts:[funfactSchema],
  languages:[languageSchema],
  quote:{
    type:String,
    required:false
  },
  services:[serviceSchema]
});

module.exports = profileSchema;
