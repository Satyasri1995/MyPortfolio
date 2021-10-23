const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const code = new Schema({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("code", code);
