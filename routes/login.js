const express = require("express");
const router = express.Router();
const LoginSchema = require("./../models/login_schema");

//Get all watchlists
router.get("/", async (req, res) => {
  try {
    const login = await LoginSchema.find();
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one watchlist
router.get("/:id", async (req, res) => {
  try {
    const watchlist = await LoginSchema.findById(req.params.id).lean();
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

  const login = new LoginSchema({
    user_id: req.body.user_id,
    phone: req.body.phone,
    password: req.body.password,
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
    const watchlist = await LoginSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }
    await LoginSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Watchlist deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
