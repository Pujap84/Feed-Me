function renderIngredientSearch() {
  //   Reset ingredients to nil
  state.fridgeItems = [];
  document.querySelector("#page").innerHTML = `
    <section class="ingredient_search">
      <h1>Search for Ingredients</h1>
      <form onSubmit="renderIngredientResults(event)">
        <input name="search-query" type="text" id="search-query" placeholder="INGREDIENTS" />
        <button id="search-btn" type="submit">Search</button>
      </form>
      <section class="search-results">
      </section>
    </section>
    <section class="display_ingredients">

    </section>
    <section class="recipe_search">
        

    </section>

    <!-- Fridge Below -->
    <section class="fridge">
      <div class="first-shelf shelf"></div>
      <div class="shelf"></div>
      <div class="shelf"></div>
      <div class="shelf"></div>
      <div class="shelf"></div>
      <div class="shelf"></div>
      <div class="shelf"></div>
      <div id="food"></div>
      <!--<div class="freezer door">
        <div class="handle"></div>
      </div>-->
      <div class="body door">
        <div class="handle"></div>
      </div>
    </section>
  `;
}

renderIngredientSearch();
