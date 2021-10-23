const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experience = new Schema({
  start: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  end: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
  job:{
      type:String,
      required:true
  },
  description:{
      type:String,
      required:true
  }
});

module.exports = mongoose.model("experience", experience);
