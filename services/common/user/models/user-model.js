const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 10
  },
  password: {
    type: String,
    required: true, 
    minlength:4, 
    maxlength: 255
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 6,
    maxlength: 100
  },
  phone: {
    type: Number,
    min: 0
  },
  permissions: {
    type: Array,
    default: []
  },
  rank: {
    type: String,
    default: "user",
    enum: ["user","admin","manager","blocked"]
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  lastLoginIp: {
    type: String,
    default: "-"
  }
},{ timestamps: true });

UserSchema.pre("save", async function(next) {
  try {
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

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;