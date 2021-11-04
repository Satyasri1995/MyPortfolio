const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  stack: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  phone_alt: {
    type: Number,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  resume_link:{
    type: String,
    required: false,
  },
  password:{
      type:mongoose.SchemaTypes.String,
      required:true
  },
  profile:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:'profile'
  }
});

module.exports = userSchema;
