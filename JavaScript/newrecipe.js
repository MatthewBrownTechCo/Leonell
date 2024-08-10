const popup = document.getElementById("nr-popup");
const recipeForm = document.getElementById("recipeForm");
let currentMaxId = 0; // Variable to store the highest ID
let ingredientCounter = 2;
let instructionCounter = 2;

function openPopUp() {
  popup.classList.add("open-popup");
}

function closePopUp() {
  popup.classList.remove("open-popup");
}

// Fetch the latest recipe ID
async function fetchLatestRecipeId() {
  try {
    const response = await fetch("http://localhost:8080/recipes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const recipes = await response.json();
    currentMaxId = recipes.reduce(
      (maxId, recipe) => Math.max(maxId, parseInt(recipe.ID)), //iterates over the array of ids and returns the max id
      0
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

// recipeForm.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   // Create a new ID for form submission
//   const newId = (currentMaxId + 1).toString();

//   const formData = new FormData(recipeForm);
//   const recipe = {
//     ID: newId, // Uses the new ID
//     title: formData.get("title"),
//     creator: formData.get("creator"),
//     ingredients: formData
//       .get("ingredients")
//       .split(",")
//       .map((ingredient) => {
//         const [quantity, name] = ingredient.split(" - ");
//         return { quantity, name };
//       }),
//     instructions: formData.get("instructions").split(","),
//   };

//   try {
//     const response = await fetch("http://localhost:8080/recipes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(recipe),
//     });

//     if (response.ok) {
//       alert("Recipe added successfully!");
//       recipeForm.reset();
//       modal.style.display = "none";
//       currentMaxId++; // Update the max ID after successful submission
//     } else {
//       alert("Failed to add recipe.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

function addIngredient() {
  const ingredientsContainer = document.getElementById("ingredients-container");
  const uniqueId = `ingredient-${ingredientCounter++}`;

  const ingredientDiv = document.createElement("div");
  ingredientDiv.className = "ingredient";
  ingredientDiv.innerHTML = `
            <label for="${uniqueId}">Ingredient:</label>         
            <input type="text" id="${uniqueId}" name="ingredientQuantity" placeholder="Quantity" required>
            <input type="text" name="ingredientName" placeholder="Ingredient" required>
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
              <input type="text" id="${uniqueId}" name="instruction" placeholder="Instruction" required>
              <button type="button" class="removeInstructionBtn" onclick="removeInstruction(this)">Remove</button>
          `;
  instructionsContainer.appendChild(instructionDiv);
}

function removeInstruction(button) {
  button.parentElement.remove();
}
