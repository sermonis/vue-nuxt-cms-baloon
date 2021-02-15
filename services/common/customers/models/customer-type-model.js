const mongoose = require("mongoose");

const escape = str => {
  return (str.replace(/"/g, '`')
    .replace(/'/g, '`')
    .replace(/>/g, '&gt;')
    .replace(/\\/g, '&#x5C;')
  );
}

const CustomerTypeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32,
    set: escape
  },
  id: {
    type: Number,
    default: 10
  }
  
},{ timestamps: true });

const CustomerTypeModel = mongoose.model("CustomerTypes", CustomerTypeSchema);

module.exports = CustomerTypeModel;