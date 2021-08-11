function renderIngredientResults(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  axios
    .post("/api/spoonacular/ingredients", data)
    .then((response) => {
      console.log(response);
      document.querySelector(".search-results").innerHTML = `
            <ul>
                ${ingredientSearchResults(response.data)}
            </ul>
        `;
    })
    .catch((error) => {
      console.log(error.response);
      document.querySelector("#errors").innerHTML = error.response.data.message;
    });
}

function ingredientSearchResults(results) {
  return results
    .map(
      (result) => `
        <li>
            <div data-id=${result.id} class="search-result">
              <p onClick="addIngredientToFridge({id:${result.id}, name:'${result.name}', image:'https://spoonacular.com/cdn/ingredients_250x250/${result.image}'})">${result.name}<span class="material-icons">add_circle_outline</span></p>
            </div>
        </li>
    `
    )
    .join("");
}

function addIngredientToFridge(ingredient) {
  state.fridgeItems.push(ingredient);
  console.log(state.fridgeItems);

  const recipeSearchSection = document.querySelector(".recipe_search");
  let shelves = document.querySelector(".first-shelf");
  const door = document.querySelector(".door");

  const ingImage = document.createElement("img");
  ingImage.src = `${ingredient.image}`;
  shelves.appendChild(ingImage);

  if (state.fridgeItems.length > 0) {
    door.classList.add("open-door");
  }

  // If there's an item in the fridge show the 'get recipes' button
  if (state.fridgeItems.length > 0) {
    recipeSearchSection.innerHTML = `
      <button onClick="renderRecipeResults(event)" id="get-recipes" type="submit">Get Recipes!!</button>
    `;
  }

  // Clear search results
  document.querySelector(".search-results").innerHTML = "";
  const searchBar = document.querySelector("#search-query");
  searchBar.value = "";
  searchBar.focus();
}
