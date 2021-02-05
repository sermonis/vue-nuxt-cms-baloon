/*const excapeHtml = str => str.replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/=/g, "&#61;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\//g, "&#x2F;")
    .replace(/\\/g, "&#x5C;")
    .replace(/`/g, "&#96;");
*/
const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Users",
      autopopulate: {
        select: "_id name surname username"
      }
    },
    arguments: {
      type: Object
    },
    module: {
      type: String,
      required: true
    },
    content: {
      type: String,
      //set: excapeHtml,
      required: true
    },
    ip: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

LogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 * 30 });

LogSchema.plugin(require("mongoose-autopopulate"));

const LogModel = mongoose.model("Logs", LogSchema);

module.exports = LogModel;