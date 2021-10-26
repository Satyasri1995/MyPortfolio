const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  start: {
    type: mongoose.SchemaTypes.Date,
    required: false,
  },
  end: {
    type: mongoose.SchemaTypes.Date,
    required: false,
  },
  organisation: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = experienceSchema;
