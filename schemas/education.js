const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  start: {
    type: mongoose.SchemaTypes.Date,
    required: false,
  },
  end: {
    type: mongoose.SchemaTypes.Date,
    required: false,
  },
  school: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = educationSchema;
