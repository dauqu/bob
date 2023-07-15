const express = require("express");
const router = express.Router();
const MessageSchema = require("./../models/sms_schema");

//Get all watchlists
router.get("/", async (req, res) => {
  try {
    const watchlists = await MessageSchema.find().lean();
    res.status(200).json(watchlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one watchlist
router.get("/:id", async (req, res) => {
  try {
    const watchlist = await MessageSchema.findById(req.params.id).lean();
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
  const watchlist = new MessageSchema({
   body: req.body.body,
  });
  try {
    const newWatchlist = await watchlist.save();
    res.status(201).json(newWatchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one watchlist
router.delete("/:id", async (req, res) => {
  try {
    const watchlist = await MessageSchema.findById(req.params.id).lean();
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }
    await MessageSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Watchlist deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
