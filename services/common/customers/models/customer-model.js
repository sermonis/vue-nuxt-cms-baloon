const mongoose = require("mongoose");

const escape = str => {
  return (str.replace(/"/g, '`')
    .replace(/'/g, '`')
    .replace(/>/g, '&gt;')
    .replace(/\\/g, '&#x5C;')
  );
}

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32,
    set: escape
  },
  auth: {
    type: String,
    minlength: 2,
    maxlength: 32,
    set: escape
  },
  customerType: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'CustomerTypes',
    autopopulate: true
  },
  email: {
    type: String,
    lowercase: true,
    minlength: 6,
    maxlength: 100
  },
  phone: {
    type: Number,
    min: 0
  },
  address: {
    type: String,
    minlength: 6,
    maxlength: 150,
    set: escape
  },
  accounting: {
    price: {
      type: Number,
      min: 1,
      required: true
    },
    currency: {
      type: String,
      minlength: 1,
      maxlength: 16,
      required: true,
      set: escape
    },
    dateStart:{
      type: Date,
      required: true
    },
    dateEnd:{
      type: Date,
      required: true
    }
  },
  commercial: {
    title: {
      type: String,
      maxlength: 100,
      set: escape
    },
    address: {
      type: String,
      maxlength: 150,
      set: escape
    },
    number: {
      type: String,
      maxlength: 32,
      set: escape
    },
    office: {
      type: String,
      maxlength: 32,
      set: escape
    }
  },
  accounts: [{
    bank:{
      type: String,
      maxlength: 64,
      set: escape
    },
    iban:{
      type: String,
      maxlength: 32,
      trim: true,
      set: escape
    },
    currency:{
      type: String,
      maxlength: 16
    }
  }],
  notices: {
    type: String,
    maxlength: 100,
    set: escape
  }
  
},{ timestamps: true });

CustomerSchema.plugin(require("mongoose-autopopulate"));

const CustomerModel = mongoose.model("Customers", CustomerSchema);

module.exports = CustomerModel;