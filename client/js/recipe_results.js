function renderRecipeResults(event) {
  event.preventDefault();
  const ingredientsArray = state.fridgeItems.map((ingredient) => {
    return ingredient.name;
  });
  const data = { ingredients: ingredientsArray };
  axios
    .post("/api/spoonacular/recipes", data)
    .then((response) => {
      console.log(response);
      document.querySelector("#page").innerHTML = `
                <h1>Your Yummy Recipes</h1>
                <div class="grid-container">
                    ${recipeResults(response.data)}
                </div>
            `;
    })
    .catch((error) => {
      console.log(error.response);
      document.querySelector("#errors").innerHTML = error.response.data.message;
    });
}

function recipeResults(results) {
  return results
    .map(
      (result) => `
              <div onClick="renderIndividualRecipe(event)" data-id=${result.id} class="recipe_search">
                  <p>${result.title}</p>
                  <img src="${result.image}" alt="">
              </div>
        `
    )
    .join("");
}
