function renderIndividualRecipe(event) {
    event.preventDefault();

    // const recipeId = 641803

    const recipeId = event.currentTarget.dataset.id; // gets me the recipe id from parent div (data-id)
    console.log(recipeId);

    axios
        .get(`/api/spoonacular/recipes/${recipeId}`)
        .then((response) => {
            console.log(response);
            document.querySelector("#page").innerHTML = `
                <div data-id=${response.data.id} class="single-recipe-display">
                    
                    <section class="back-to-results">
                        <button onclick="renderRecipeResults(event)">
                            Back to Recipe Results
                        </button>
                    </section>
                    <div class="each-recipe">
                        <div class="recipe-info">
                            <h1 class="recipe-title">${response.data.title}</h1>
                            <span class="material-icons favorite" onClick="">favorite</span>
                        </div>
                        <img class="each-recipe-image"src="${
                            response.data.image
                        }" alt="">
                    </div>
                    <h2>Description</h2>    
                    <p>${response.data.summary}</p>
                    <h2>Ingredients</h2>
                    <div class="grid-container-ingredient">
                        ${renderRecipeIngredients(
                            response.data.extendedIngredients
                        )}
                    </div>
                    <h2>Instructions</h2>
                    ${renderInstructionLink(response.data)}
                </div>
            `;
        })
        .catch((error) => {
            console.log(error.response);
            document.querySelector("#errors").innerHTML =
                error.response.message;
        });
}

function renderRecipeIngredients(ingredients) {
    return ingredients
        .map(
            (ingredient) => `
                    <div data-id=${ingredient.id} class="single-ingredient">
                        
                        <div class="ingredient-info">
                            <h3 class="ingredient-title">${ingredient.name}</h3>
                        </div>
                        <img class="recipe-image" src="https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}" alt="">
                    
                    </div>
            `
        )
        .join("");
}

function renderInstructionLink(recipe) {
    if (recipe.instructions) {
        return `
            <ul>${recipe.instructions}</ul>
        `;
    } else {
        return `
            <p><a href="${recipe.sourceUrl}">Read the detailed instructions on ${recipe.sourceName}</a></p>
        `;
    }
}
