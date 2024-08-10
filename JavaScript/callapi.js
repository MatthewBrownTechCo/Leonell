async function getData() {
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

async function getRecipe() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {
    const response = await fetch(`http://localhost:8080/recipes/${id}`);
    const recipe = await response.json();

    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById(
      "recipe-creator"
    ).textContent = `Creator: ${recipe.creator}`;
    document.getElementById(
      "recipe-ingredients"
    ).textContent = `Ingredients: ${recipe.ingredients.join(", ")}`;
    document.getElementById(
      "recipe-instructions"
    ).textContent = `Instructions: ${recipe.instructions}`;
  } catch (error) {
    console.error("Failed to fetch recipe:", error);
  }
}

window.onload = getRecipe;
