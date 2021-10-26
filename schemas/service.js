const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  icon: {
    type: String,
    required: false,
  },
  fact:{
      type:String,
      required:false
  },
  description:{
      type:String,
      required:false
  },
});

module.exports = serviceSchema;
