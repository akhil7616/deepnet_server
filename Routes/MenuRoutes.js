const express = require("express");
const router = express.Router();
const Menu = require("../Models/Menu");
const MenuItem = require("../Models/MenuItem");

// ✅ Create a new menu
router.post("/menus", async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get all menus with their items
router.get("/menus", async (req, res) => {
    try {
        const menus = await Menu.find().populate("items");
        res.json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// ✅ Add a new menu item
router.post("/menus/:menuId/items", async (req, res) => {
    try {
        const { menuId } = req.params;
        const { name, description, price } = req.body;

        const newItem = new MenuItem({ name, description, price, menuId });
        await newItem.save();

        await Menu.findByIdAndUpdate(menuId, { $push: { items: newItem._id } });

        res.json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get a single menu by ID with its items
router.get("/menus/:menuId", async (req, res) => {
    try {
        const { menuId } = req.params;
        const menu = await Menu.findById(menuId).populate("items");

        if (!menu) {
            return res.status(404).json({ error: "Menu not found" });
        }

        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
