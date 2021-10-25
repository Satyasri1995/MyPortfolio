const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profile = new Schema({
  user:{
      type:mongoose.SchemaTypes.ObjectId,
      required:false,
      ref:'user'
  },
  about:{
      type:mongoose.SchemaTypes.ObjectId,
      required:false,
      ref:'about'
  },
  codes:[{
        type:mongoose.SchemaTypes.ObjectId,
        required:false,
        ref:'code'
  }],
  educations:[
      {
          type:mongoose.SchemaTypes.ObjectId,
          required:false,
          ref:'education'
      }
  ],
  experiences:[
      {
          type:mongoose.SchemaTypes.ObjectId,
          required:false,
          ref:'experience'
      }
  ],
  funfacts:[
      {
          type:mongoose.SchemaTypes.ObjectId,
          required:false,
          ref:'funfact'
      }
  ],
  languages:[
      {
          type:mongoose.SchemaTypes.ObjectId,
          required:false,
          ref:'language'
      }
  ],
  quote:{
      type:mongoose.SchemaTypes.ObjectId,
      required:false,
      ref:'quote'
  },
  services:[
      {
          type:mongoose.SchemaTypes.ObjectId,
          required:false,
          ref:'service'
      }
  ]

});

module.exports = mongoose.model("profile", profile);
