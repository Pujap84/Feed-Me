function renderIndividualRecipe(event) {
  event.preventDefault();

  // const recipeId = 641803

  const recipeId = event.currentTarget.dataset.id; // gets me the recipe id from parent div (data-id)
  console.log(recipeId);

  axios.get(`/api/spoonacular/recipes/${recipeId}`).then((response) => {
    console.log(response);
    document.querySelector("#page").innerHTML = `
                <div data-id=${response.data.id} class="recipe_search">
                    <div>
                        <h1>${response.data.title}</h1>
                        <button onclick="renderRecipeResults(event)" class="back-to-results">
                            Back to Recipe Results
                        </button>
                        <form onSubmit="addToFavourites(event)">
                            <input name="name" type="hidden" value="${
                              response.data.title
                            }"/>
                            <input name="spoonacular_id" type="hidden" value="${
                              response.data.id
                            }"/>
                        <button id="search-btn" type="submit">Add to Favourites</button>
                      </form>
                    </div>
                    
                    <img src="${response.data.image}" alt="">
                    <p>${response.data.summary}</p>
                    <h2>Ingredients</h2>
                    <div class="grid-container">
                        ${renderRecipeIngredients(
                          response.data.extendedIngredients
                        )}
                    </div>
                    <h2>Instructions</h2>
                    ${renderInstructionLink(response.data)}
                </div>
            `;
  });
}

function renderRecipeIngredients(ingredients) {
  return ingredients
    .map(
      (ingredient) => `
                    <div data-id=${ingredient.id} class="recipe_ingredient">
                        <p>${ingredient.name}</p>
                        <img src="https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}" alt="">
                    
                    </div>
            `
    )
    .join("");
}

function renderInstructionLink(recipe) {
  if (recipe.instructions) {
    return `
            <p>${recipe.instructions}</p>
        `;
  } else {
    return `
            <a href="${recipe.sourceUrl}">Read the detailed instructions on ${recipe.sourceName}</a>
        `;
  }
}
