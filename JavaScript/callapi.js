// Gets the list of titles on the recipes page
async function getRecipeList() {
  try {
    const results = await fetch("http://localhost:8080/recipes")
      .then((data) => data.json())
      .then((data) => data);

    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    for (const result of results) {
      const listItem = document.createElement("li");

      const link = document.createElement("a");
      link.className = "recipe-link";
      link.href = `recipe.html?id=${result.id}`; // Pass the recipe ID in the query string
      link.textContent = result.title;

      listItem.appendChild(link);
      recipeList.appendChild(listItem);
    }
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML =
      "<p>Sorry, there was an error loading the recipes. Please try again later.</p>";
  }
}

// Gets selected full recipe
function getRecipe() {
  getRecipeTitle();
  getRecipeIngredients();
  getRecipeInstructions();
}

// Gets selected recipe title
async function getRecipeTitle() {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  try {
    const result = await fetch(`http://localhost:8080/recipes/${recipeId}`)
      .then((data) => data.json())
      .then((data) => data);

    const recipeTitle = document.getElementById("recipe-title");
    recipeTitle.innerHTML = result.title;
  } catch {
    recipeTitle.innerHTML = "Recipe not found. Please try again later.";
  }
}

// Get selected recipe ingredients
async function getRecipeIngredients() {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  try {
    const result = await fetch(`http://localhost:8080/recipes/${recipeId}`)
      .then((data) => data.json())
      .then((data) => data);

    const ingredients = document.getElementById("recipe-ingredients");
    ingredients.innerHTML = ""; // Clear any previous content
    result.ingredients.forEach((ingredient) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${ingredient.quantity} ${ingredient.name}`;
      ingredients.appendChild(listItem);
    });
  } catch {
    ingredients.innerHTML = "Recipe not found. Please try again later.";
  }
}

async function getRecipeInstructions() {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  try {
    const result = await fetch(`http://localhost:8080/recipes/${recipeId}`)
      .then((data) => data.json())
      .then((data) => data);

    const instructions = document.getElementById("recipe-instructions");
    instructions.innerHTML = ""; // Clear any previous content

    result.instructions.forEach((instruction) => {
      const listItem = document.createElement("li");
      listItem.textContent = instruction;
      instructions.appendChild(listItem);
    });
  } catch {
    ingredients.innerHTML = "Recipe not found. Please try again later.";
  }
}

async function createRecipe(id, title, creator, ingredients, instructions) {
  const data = {
    id,
    title,
    creator,
    ingredients,
    instructions,
  };
  const result = await fetch("http://localhost:8080/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => data.json())
    .then((data) => data);
  console.log(result);
}
