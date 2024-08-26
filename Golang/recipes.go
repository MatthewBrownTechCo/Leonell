package main

import "errors"

// Ingredients represents the ingredients for a recipe
type Ingredients struct {
	Quantity string `json:"quantity"`
	Name     string `json:"name"`
}

// Recipe represents a recipe with its details
type Recipe struct {
	ID           string       `json:"id"`
	Title        string       `json:"title"`
	Creator      string       `json:"creator"`
	Ingredients  []Ingredients `json:"ingredients"`
	Instructions []string     `json:"instructions"`
}

func GetRecipeById(id string) (*Recipe, error) {
	for i, r := range Recipes {
		if r.ID == id {
			return &Recipes[i], nil
		}
	}

	return nil, errors.New("recipe not found")
}

// Predefined recipes data
var Recipes = []Recipe{
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
		{Quantity: "1c", Name: "Monterey Jack cheese divided"},
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
	{ID: "3", Title: "Bean Dip", Creator: "Elizabeth Beasley", Ingredients: []Ingredients{
		{Quantity: "1 can", Name: "Ranch Style beans - mashed"},
		{Quantity: "1T", Name: "Worcestershire"},
		{Quantity: "1/2T", Name: "chili powder"},
		{Quantity: "1/4c", Name: "salsa"},
		{Quantity: "1/2T", Name: "mustard"},
	}, Instructions: []string{
		"Mix - Beat with mixer or blend in a blender",
	}},
}