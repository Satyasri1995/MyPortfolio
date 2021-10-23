const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const education = new Schema({
  start: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  end: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  location:{
      type:String,
      required:true
  },
  description:{
      type:String,
      required:true
  }
});

module.exports = mongoose.model("education", education);
