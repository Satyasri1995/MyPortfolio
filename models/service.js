const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const service = new Schema({
  icon: {
    type: String,
    required: true,
  },
  fact:{
      type:String,
      required:true
  },
  description:{
      type:String,
      required:true
  },
});

module.exports = mongoose.model("service", service);
