const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
  icon: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  star: {
    type: Number,
    required: false,
  },
});

module.exports = codeSchema;
