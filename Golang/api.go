package main

import (
	"net/http"

	"errors"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://127.0.0.1:5500"},
		AllowMethods: []string{"PUT", "PATCH", "POST", "DELETE", "GET"},
		AllowHeaders: []string{"Content-Type"},
		AllowCredentials: true,
	}))
	router.GET("/recipes", getRecipes)
	router.GET("/recipes/:id", recipeById)
	router.POST("/recipes", createRecipe)
	router.Run("localhost:8080")
}

type Ingredients struct {
	Quantity string 			`json:"quantity"`
	Name string					`json:"name"`
}

type Recipe struct {
	ID string					`json:"id"`
	Title string				`json:"title"`
	Creator string				`json:"creator"`
	Ingredients []Ingredients 	`json:"ingredients"`
	Instructions []string		`json:"instructions"`
}

func getRecipes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, recipes)
}

func getRecipeById(id string) (*Recipe, error) {
	for i, r := range recipes {
		if r.ID == id {
			return &recipes[i], nil
		}
	}

	return nil, errors.New("recipe not found")
}

func recipeById(c *gin.Context) {
	id := c.Param("id")
	recipe, err := getRecipeById(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "recipe not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, recipe)
}

func createRecipe(c *gin.Context) {
	var newRecipe Recipe

	if err := c.BindJSON(&newRecipe); err != nil {
		return
	}

	recipes = append(recipes, newRecipe)
	c.IndentedJSON(http.StatusCreated, newRecipe)
}

var recipes = []Recipe {
	{ID: "1", Title: "Artichoke Dip", Creator: "Elizabeth Beasley", Ingredients: []Ingredients{
		{Quantity: "2 cans", Name: "artichoke hearts - chopped"},
		{Quantity: "1 1/2c", Name: "mayonnaise"},
		{Quantity: "1 pkg", Name: "Good Seasonings Italian dressing mix"},
	}, Instructions: []string{
		"Mix several hours ahead of time to allow flavors to blend.",
	},
	},
	
	{ID: "2", Title: "Spicy Spinach & Artichoke Dip", Creator: "Elizabeth Beasley", Ingredients: []Ingredients{
		{Quantity: "10oz pkgs", Name: "frozen chopped spinach thawed and drained"},
		{Quantity: "14oz can", Name: "artichoke hearts drained and chopped"},
		{Quantity: "1c", Name: "Monterey Jack cheese divded"},
		{Quantity: "1c", Name: "Parmesan cheese divided"},
		{Quantity: "1", Name: "8oz pkg cream cheese"},
		{Quantity: "1", Name: "8oz sour cream"},
		{Quantity: "1c", Name: "chopped onion"},
		{Quantity: "1", Name: "stick butter"},
		{Quantity: "2T", Name: "8oz sour cream"},
		{Quantity: "To taste", Name: "salt"},

	}, Instructions: []string{
		"Melt butter in large heavy skillet over medium heat",
		"Add onion and cook until soft",
		"Stir in rest of ingredients except 1/4c each of Monterey Jack and Parmesean cheeses",
		"Stir until well blended and heated through",
		"Pour into small casserole dish and top with remaining cheese",
		"Bake at 350° until cheese starts to melt and starts to brown - about 10 minutes",
	}},
}
