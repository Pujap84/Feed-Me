const express = require("express");
const axios = require("axios");

const router = express.Router();

// Search Spoonacular Ingredients API
router.post("/ingredients", function (req, res) {
  const query = req.body["search-query"];
  const api_key = process.env.SPOONACULAR_API_KEY;

  axios
    .get(
      `https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${api_key}`
    )
    .then((response) => {
      const result = response.data.results;
      res.json(result);
    });
});

router.post("/recipes", function (req, res) {
    const ingredients = req.body.ingredients;
    const api_key = process.env.SPOONACULAR_API_KEY;
    const ingredientsString = ingredients.join(',+');
    console.log(req.body)
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients/?ingredients=${ingredientsString}&apiKey=${api_key}&ranking=2`
      )
      .then((response) => {
        const result = response.data;
        res.json(result);
    }).catch(error => {
        console.log(error)
    });
});

router.get("/recipes/:recipeId", function (req, res) {
    const id = req.params.recipeId
    const api_key = process.env.SPOONACULAR_API_KEY;

    console.log(id)
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`
      )
      .then((response) => {
        const result = response.data;
        res.json(result);
    }).catch(error => {
        console.log(error)
    });
});

module.exports = router;
