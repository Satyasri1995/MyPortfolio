const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const funfact = new Schema({
  icon: {
    type: String,
    required: true,
  },
  fact:{
      type:String,
      required:true
  },
});

module.exports = mongoose.model("funfact", funfact);
