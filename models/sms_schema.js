const mongoose = require("mongoose");

//Schema
const MessageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      ref: "news",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sms", MessageSchema);
