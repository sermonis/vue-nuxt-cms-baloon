const mongoose = require("mongoose");
/* 
decimal text
/^\d+(\.\d{2})?$/

*/
const BalloonSchema = new mongoose.Schema({
  registration: {
    type: String,
    uppercase: true,
    required: true,
    unique: true,
    maxlength: 6
  },
  volume: {
    type: Number,
    default: 1,
    min: 0,
    set: v => Math.trunc(v)
  },
  passengerCapacity: {
    type: Number,
    default: 0,
    min: 0,
    set: v => Math.trunc(v)
  },
  pilotCapacity: {
    type: Number,
    default: 1,
    min: 1,
    set: v => Math.trunc(v)
  },
  envelope: {
    brand:{
      type: String,
      maxlength: 6
    },
    type:{
      type: String,
      maxlength: 6
    },
    serial:{
      type: String,
      maxlength: 6
    },
    date:{
      type: String,
      maxlength: 6
    }
  },
  crew: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Staff',
    autopopulate: {
      select: "_id name username"
    }
  }],
  customer:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Customer',
    autopopulate: {
      select: "_id name"
    }
  },
  burner: {
    brand:{
      type: String,
      maxlength: 6
    },
    type:{
      type: String,
      maxlength: 6
    },
    serial:{
      type: String,
      maxlength: 6
    },
    date:{
      type: String,
      maxlength: 6
    }
  },
  basket: {
    brand:{
      type: String,
      maxlength: 6
    },
    type:{
      type: String,
      maxlength: 6
    },
    serial:{
      type: String,
      maxlength: 6
    },
    date:{
      type: String,
      maxlength: 6
    }
  },
  sensor: {
    brand:{
      type: String,
      maxlength: 6
    },
    type:{
      type: String,
      maxlength: 6
    },
    serial:{
      type: String,
      maxlength: 6
    },
    date:{
      type: String,
      maxlength: 6
    }
  },
  cylinders: Array,
  insurance: Date,
  reviewCertificate: Date,
  status: {
    type: String,
    default: "Aktif",
    enum: ["Aktif","Pasif","Kiralik"]
  }
});

const BalloonModel = mongoose.model("Balloons", BalloonSchema);

module.exports = BalloonModel;