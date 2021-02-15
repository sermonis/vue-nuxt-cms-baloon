const mongoose = require('mongoose');

const escape = str => {
  return (str.replace(/"/g, '`')
    .replace(/'/g, '`')
    .replace(/>/g, '&gt;')
    .replace(/\\/g, '&#x5C;')
  );
}
/* 
decimal text
/^\d+(\.\d{2})?$/

*/
const BalloonSchema = new mongoose.Schema(
  {
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
      brand: {
        type: String,
        maxlength: 32,
        set: escape
      },
      type: {
        type: String,
        maxlength: 32,
        set: escape
      },
      serial: {
        type: String,
        maxlength: 32,
        set: escape
      },
      weight: Number,
      mtow: Number,
      mlm: Number,
      date: {
        type: String,
        maxlength: 7
      }
    },
    crew: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Staff',
      autopopulate: {
        select: '_id name username'
      }
    }],
    customer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Customers',
      autopopulate: {
        select: '_id name'
      }
    },
    burner: {
      brand: {
        type: String,
        maxlength: 32,
        set: escape
      },
      type: {
        type: String,
        maxlength: 32,
        set: escape
      },
      serial: {
        type: String,
        maxlength: 32,
        set: escape
      },
      weight: Number,
      date: {
        type: String,
        maxlength: 7
      }
    },
    basket: {
      brand: {
        type: String,
        maxlength: 32,
        set: escape
      },
      type: {
        type: String,
        maxlength: 32,
        set: escape
      },
      serial: {
        type: String,
        maxlength: 32,
        set: escape
      },
      weight: Number,
      date: {
        type: String,
        maxlength: 7
      }
    },
    sensor: {
      brand: {
        type: String,
        maxlength: 32,
        set: escape
      },
      type: {
        type: String,
        maxlength: 32,
        set: escape
      },
      serial: {
        type: String,
        maxlength: 32,
        set: escape
      },
      ttBrand: {
        type: String,
        maxlength: 32,
        set: escape
      },
      ttType: {
        type: String,
        maxlength: 32,
        set: escape
      },
      ttSerial: {
        type: String,
        maxlength: 32,
        set: escape
      },
      tabletBrand: {
        type: String,
        maxlength: 32,
        set: escape
      },
      tabletType: {
        type: String,
        maxlength: 32,
        set: escape
      },
      tabletSerial: {
        type: String,
        maxlength: 32,
        set: escape
      }
    },
    cylinders: Array,
    insurance: Date,
    reviewCertificate: Date,
    status: {
      type: String,
      default: 'Aktif',
      enum: ['Aktif', 'Pasif', 'Kiralik']
    }
  },
  { timestamps: true }
);

// BalloonSchema.plugin(require("mongoose-autopopulate"));

const BalloonModel = mongoose.model('Balloons', BalloonSchema);

module.exports = BalloonModel;
