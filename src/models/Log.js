const mongoose = require("mongoose");
const logSchema = new mongoose.Schema({
    eventType: String,
    payload: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now },
  });
  module.exports = mongoose.model("Log", logSchema);
  