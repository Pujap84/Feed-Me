function renderRecipeBook() {
  axios.get("/api/recipe").then((response) => {
    document.querySelector("#page").innerHTML = `
          <section class="recipe-book">
              <h1>Recipe Book</h1>
                <section class='recipe-book-grid'>
                  ${renderRecipes(response.data)}
                </section>
          </section>
      `;
  });
}

function renderRecipes(recipes) {
  return recipes
    .map(
      (recipe) => `
              <div class="my-recipe-card">
                <img
                    src="${recipe.image}"
                    class="my-recipe-img"
                    alt="..."
                />
                <div class="my-recipe-body">
                  <h5 class="my-recipe-title">${recipe.name}</h5>
                </div>
                <div class="my-recipe-buttons">
                  <button onClick="renderIndividualRecipe(event, ${recipe.spoonacular_id})" class="details-button">Details</button>
                  <button onClick="removeFromFavourites(event, ${recipe.id})" id="delete-recipe-btn">Delete</button>
                </div>
              </div>
              
        `
    )
    .join("");
}

function addToFavourites(name, spoonacular_id, image) {
  const data = {
    name,
    spoonacular_id,
    image,
  };

  axios.post("/api/recipe", data).then((response) => {
    console.log(response);
    if (response.data.msg === "No user or not logged in") {
      renderLoginForm();
    } else {
      renderRecipeBook();
    }
  });
}

function removeFromFavourites(event, id) {
  console.log("removeFromFavourites");
  event.preventDefault();
  axios.delete(`/api/recipe/${id}`).then((response) => {
    renderRecipeBook();
  });
}
