const express = require("express");
const Sessions = require("../helpers/sessions_helper");
const Recipe = require("../models/recipes");
const router = express.Router();

// Create
router.post("/", (req, res) => {
  const name = req.body.name;
  const spoonacular_id = Number(req.body.spoonacular_id);
  const notes = req.body.notes;
  const rating = Number(req.body.rating);

  // Get current user
  Sessions.getCurrentUser(req.session).then((user) => {
    if (!user) return res.json({ msg: "User not found" });

    // Add recipe to users recipe book
    Recipe.create(user.id, name, spoonacular_id, notes, rating)
      .then((response) => {
        res.json({ msg: "Created recipe", recipe: response });
      })
      .catch((err) => {
        res.json({ msg: "Error creating recipe", error: err });
      });
  });
});

// Get Recipe
router.get("/", (req, res) => {
  res.json({ msg: "Get recipe" });
});

// Update
router.put("/", (req, res) => {
  res.json({ msg: "Update recipe" });
});

// Delete recipe
router.delete("/", (req, res) => {
  res.json({ msg: "Delete recipe" });
});

module.exports = router;
