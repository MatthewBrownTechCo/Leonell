import fetch from "node-fetch";

async function getData() {
  const results = await fetch("http://localhost:8080/recipes")
    .then((data) => data.json())
    .then((data) => data);

  for (const result of results) {
    console.log(result);
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
