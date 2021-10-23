const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const language = new Schema({
  language: {
    type: String,
    required: true,
  },
  speak:{
      type:Number,
      required:true
  },
  read:{
      type:Number,
      required:true
  },
  write:{
      type:Number,
      required:true
  },
});

module.exports = mongoose.model("language", language);
