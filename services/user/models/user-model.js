const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 4,
    maxLength: 10
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    maxLength: 32
  },
  surname: {
    type: String,
    required: true,
    maxLength: 32
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  phone: {
    type: Number
  },
  permissions: {
    type: Array,
    default: []
  },
  rank: {
    type: Number,
    default: 1
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  lastLoginIp: {
    type: String,
    default: "-"
  }
});

UserSchema.pre("save", async function(next) {
  try {
    /* 
      Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
      */
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

UserSchema.plugin(require("mongoose-autopopulate"));

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
