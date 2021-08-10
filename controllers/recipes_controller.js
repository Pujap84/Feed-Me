const express = require("express");
const Sessions = require("../helpers/sessions_helper");
const Recipe = require("../models/recipe");
const router = express.Router();

// Create
router.post("/", (req, res) => {
  const name = req.body.name;
  const spoonacular_id = Number(req.body.spoonacular_id);
  const image = req.body.image;

  //   TODO on frontend, default value for now
  const notes = "";
  const rating = 5;

  // Get current user
  Sessions.getCurrentUser(req.session).then((user) => {
    if (!user) return res.json({ msg: "No user or not logged in" });

    // Add recipe to users recipe book
    Recipe.create(user.id, name, spoonacular_id, notes, rating, image)
      .then((response) => {
        res.json({ msg: "Added recipe to the recipe book", recipe: response });
      })
      .catch((err) => {
        res.json({ msg: "Error adding recipe to the recipe book", error: err });
      });
  });
});

// Get All Recipes FOr the logged in user
router.get("/", (req, res) => {
  Sessions.getCurrentUser(req.session).then((user) => {
    if (!user) return res.json({ msg: "User not found" });

    Recipe.getAllByUserId(user.id).then((recipes) => {
      res.json(recipes);
    });
  });
});

// Update
router.put("/:recipeId", (req, res) => {
  const name = req.body.name;
  const spoonacular_id = Number(req.body.spoonacular_id);
  const notes = req.body.notes;
  const rating = Number(req.body.rating);
  const recipeId = req.params.recipeId;

  // Get current user
  Sessions.getCurrentUser(req.session).then((user) => {
    if (!user) return res.json({ msg: "User not found" });

    // Add recipe to users recipe book
    Recipe.update(recipeId, user.id, name, spoonacular_id, notes, rating)
      .then((response) => {
        res.json({ msg: "Updated recipe", recipe: response });
      })
      .catch((err) => {
        res.json({ msg: "Error creating recipe", error: err });
      });
  });
});

// Delete recipe
router.delete("/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;

  // Get current user
  Sessions.getCurrentUser(req.session).then((user) => {
    if (!user) return res.json({ msg: "User not found" });

    // Add recipe to users recipe book
    Recipe.delete(recipeId)
      .then((response) => {
        res.json({ msg: "Deleted recipe" });
      })
      .catch((err) => {
        res.json({ msg: "Error deleting recipe", error: err });
      });
  });
});

module.exports = router;
