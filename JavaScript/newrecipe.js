const popup = document.getElementById("nr-popup");
const recipeForm = document.getElementById("recipe-form");
const overlay = document.getElementById("overlay");
let currentMaxId = 0; // Variable to store the highest ID
let ingredientCounter = 2;
let instructionCounter = 2;

function openPopUp() {
  popup.classList.add("open-popup");
  overlay.style.visibility = "visible";
}

function closePopUp() {
  popup.classList.remove("open-popup");
  overlay.style.visibility = "hidden";
}

// Fetch the latest recipe ID
async function fetchLatestRecipeId() {
  try {
    const response = await fetch("http://localhost:8080/recipes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const recipes = await response.json();
    currentMaxId =
      recipes.length > 0
        ? recipes.reduce(
            (maxId, recipe) => Math.max(maxId, parseInt(recipe.ID, 10)), // Ensure parsing with base 10
            0
          )
        : 0; // Default to 0 if no recipes
  } catch (error) {
    console.error("Error fetching recipes:", error);
    currentMaxId = 0; // Default to 0 in case of error
  }
}

recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Create a new ID for form submission
  const newId = (currentMaxId + 1).toString();

  // Gather ingredients
  const ingredients = [];
  const ingredientElements = document.querySelectorAll(".ingredient");
  ingredientElements.forEach((ingredientElement) => {
    const quantity = ingredientElement.querySelector(
      '[name="ingredientQuantity"]'
    ).value;
    const name = ingredientElement.querySelector(
      '[name="ingredientName"]'
    ).value;
    if (quantity && name) {
      ingredients.push({ quantity, name });
    }
  });

  // Gather instructions
  const instructions = [];
  const instructionElements = document.querySelectorAll(".instruction");
  instructionElements.forEach((instructionElement) => {
    const instruction = instructionElement.querySelector(
      '[name="instruction"]'
    ).value;
    if (instruction) {
      instructions.push(instruction);
    }
  });

  const fullRecipe = {
    ID: newId, // Uses the new ID
    title: recipeForm.querySelector('[name="title"]').value,
    creator: recipeForm.querySelector('[name="author"]').value,
    ingredients: ingredients,
    instructions: instructions,
  };

  try {
    const response = await fetch("http://localhost:8080/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullRecipe),
    });

    if (response.ok) {
      alert("Recipe added successfully!");
      recipeForm.reset();
      modal.style.display = "none";
      currentMaxId++; // Update the max ID after successful submission
    } else {
      alert("Failed to add recipe.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

function addIngredient() {
  const ingredientsContainer = document.getElementById("ingredients-container");
  const uniqueId = `ingredient-${ingredientCounter++}`;

  const ingredientDiv = document.createElement("div");
  ingredientDiv.className = "ingredient";
  ingredientDiv.innerHTML = `
            <label for="${uniqueId}">Ingredient:</label>         
            <input type="text" id="${uniqueId}" class="input" name="ingredientQuantity" placeholder="Quantity" required>
            <input type="text" name="ingredientName" class="input" placeholder="Ingredient" required>
            <button type="button" class="removeIngredientBtn" onclick="removeIngredient(this)">Remove</button>
        `;
  ingredientsContainer.appendChild(ingredientDiv);
}

function removeIngredient(button) {
  button.parentElement.remove();
}

function addInstruction() {
  const instructionsContainer = document.getElementById(
    "instructions-container"
  );
  const uniqueId = `instruction-${instructionCounter++}`;

  const instructionDiv = document.createElement("div");
  instructionDiv.className = "instruction";
  instructionDiv.innerHTML = `
              <label for="${uniqueId}">Instruction:</label>
              <input type="text" id="${uniqueId}" class="input" name="instruction" placeholder="Instruction" required>
              <button type="button" class="removeInstructionBtn" onclick="removeInstruction(this)">Remove</button>
          `;
  instructionsContainer.appendChild(instructionDiv);
}

function removeInstruction(button) {
  button.parentElement.remove();
}
