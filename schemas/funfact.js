const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const funfactSchema = new Schema({
  icon: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
});

module.exports = funfactSchema;
