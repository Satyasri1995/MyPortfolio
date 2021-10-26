const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  language: {
    type: String,
    required: false,
  },
  speak:{
      type:Number,
      required:false
  },
  read:{
      type:Number,
      required:false
  },
  write:{
      type:Number,
      required:false
  },
});

module.exports = languageSchema;
