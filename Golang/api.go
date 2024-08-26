package main

import (
	"net/http"

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

func getRecipes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, Recipes)
}

func recipeById(c *gin.Context) {
	id := c.Param("id")
	recipe, err := GetRecipeById(id)

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

	Recipes = append(Recipes, newRecipe)
	c.IndentedJSON(http.StatusCreated, newRecipe)
}
