const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quote = new Schema({
  quote:{
      type:String,
      required:true
  },
});

module.exports = mongoose.model("quote", quote);
