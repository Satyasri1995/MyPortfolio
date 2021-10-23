const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const about = new Schema({
    profile_summary: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user:{
      type:mongoose.SchemaTypes.ObjectId,
      required:true,
      ref:'user'
  }
});

module.exports = mongoose.model("about", about);
