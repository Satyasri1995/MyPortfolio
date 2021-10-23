const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  stack: [
    {
      type: String,
      required: false,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  phonne_alt: {
    type: Number,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  password:{
      type:mongoose.SchemaTypes.String,
      required:true
  }
});

module.exports = mongoose.model("user", user);
