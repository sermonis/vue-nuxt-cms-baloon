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
    unique: true
  },
  volume: {
    type: Number,
    default: 0,
    set: v => Math.trunc(v)
  },
  passengerCapacity: {
    type: Number,
    default: 0
  },
  pilotCapacity: {
    type: Number,
    default: 1
  },
  envelope: {
    brand:{
      type: String,
      default: '-'
    },
    type:{
      type: String,
      default: '-'
    },
    serial:{
      type: String,
      default: '-'
    },
    date:{
      type: String,
      default: '-'
    }
  },
  crew: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Staff',
    autopopulate: {
      select: "_id name username"
    }
  }],
  customer: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Customer',
    autopopulate: {
      select: "_id name username"
    }
  }],
  burner: {
    brand:{
      type: String,
      default: '-'
    },
    type:{
      type: String,
      default: '-'
    },
    serial:{
      type: String,
      default: '-'
    },
    date:{
      type: String,
      default: '-'
    }
  },
  basket: {
    brand:{
      type: String,
      default: '-'
    },
    type:{
      type: String,
      default: '-'
    },
    serial:{
      type: String,
      default: '-'
    },
    date:{
      type: String,
      default: '-'
    }
  },
  sensor: {
    brand:{
      type: String,
      default: '-'
    },
    type:{
      type: String,
      default: '-'
    },
    serial:{
      type: String,
      default: '-'
    },
    date:{
      type: String,
      default: '-'
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