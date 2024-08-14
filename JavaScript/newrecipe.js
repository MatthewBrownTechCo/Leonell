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
        ? recipes.reduce((maxId, recipe) => {
            console.log("Processing recipe:", recipe);
            const id = parseInt(recipe.id, 10);
            if (isNaN(id)) {
              console.error(`Invalid ID found: ${recipe.id}`);
              return maxId;
            }
            return Math.max(maxId, id);
          }, 0)
        : 0; // Default to 0 if no recipes

    console.log("Max ID:", currentMaxId);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    currentMaxId = 0; // Default to 0 in case of error
  }
}

recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Create a new ID for form submission
  const newId = (currentMaxId + 1).toString();

  const ingredientsContainer = document.getElementById("ingredients-container");

  // Collected ingredient values
  const quantityInputs = ingredientsContainer.querySelectorAll(
    'input[name="ingredientQuantity"]'
  );
  const nameInputs = ingredientsContainer.querySelectorAll(
    'input[name="ingredientName"]'
  );

  const ingredients = [];
  for (let i = 0; i < quantityInputs.length; i++) {
    ingredients.push({
      quantity: quantityInputs[i].value,
      name: nameInputs[i].value,
    });
  }

  const instructionsInput = document.querySelectorAll(
    'input[name="instruction"]'
  );

  const instructions = [];
  for (let i = 0; i < instructionsInput.length; i++) {
    instructions.push(instructionsInput[i].value);
  }

  // Collect other form values
  const title = document.getElementById("new-title").value;
  const author = document.getElementById("new-author").value;

  const fullRecipe = {
    id: newId,
    title: title,
    creator: author,
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
