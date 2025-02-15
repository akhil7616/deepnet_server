const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }]
});

module.exports = mongoose.model("Menu", menuSchema);
