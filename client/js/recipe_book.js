function renderRecipeBook() {
  axios.get("/api/recipe").then((response) => {
    console.log(response);
    document.querySelector("#page").innerHTML = `
          <section class="recipe-book">
              ${renderRecipes(response.data)}
          </section>
      `;
  });
}

function renderRecipes(recipes) {
  return recipes
    .map(
      (recipe) => `
        <div class="my-recipe">
            <h1>${recipe.name}</h1>
            <p>${recipe.notes}</p>
        </div>
    `
    )
    .join("");
}

function addToFavourites(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));

  axios.post("/api/recipe", data).then((response) => {
    console.log(response);
  });
}
