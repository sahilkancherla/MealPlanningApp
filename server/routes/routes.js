
// imports
const express = require('express');
const mongoose = require('mongoose');

// get the database
const database = mongoose.connection;

// to get routes
const router = express.Router()

// recipe schema
const Recipe = require('../models/recipe');

// POST - store a new recipe
router.post('/post', async (req, res) => {

    try {
        const recipes = database.collection("recipes");
        const data = new Recipe({
            user: req.body.user,
            name: req.body.name,
            description: req.body.description,
            servings: req.body.servings,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        })

        const result = await recipes.insertOne(data);

        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// DELETE - delete a recipe, by recipe name
router.delete('/delete', async (req, res) => {
    try {
        const recipes = database.collection("recipes");
        const query = req.body;

        // Query for all movies with a title containing the string "Santa"
        const result = await recipes.deleteOne(query);
        console.log("Deleted " + result.deletedCount + " documents");
        res.send("Deletion complete")
      } catch(err){
        console.log(err)
      }
    //res.send('Delete by ID API')
})



module.exports = router;