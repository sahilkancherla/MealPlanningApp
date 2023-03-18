
// imports
const express = require('express');
const mongoose = require('mongoose');

// get the database
const database = mongoose.connection;

// to get routes
const router = express.Router()

// recipe schema
const Recipe = require('../models/recipe');

const  ObjectId = require('mongodb').ObjectId;


// GET - get all recipes

router.get('/getRecipes', async (req, res) => {
    try{
        const recipes = database.collection("recipes");
        const data = await recipes.find().toArray();
        res.send(data);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
  });

// GET - get one recipe using id
router.get('/getRecipe', async (req, res) => {
    try{
        const recipes = database.collection("recipes");
        const id = req.query.id;
        const data = await recipes.findOne({ _id: new ObjectId(id) });
        res.send(data);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
  });


// POST - store a new recipe
router.post('/postRecipe', async (req, res) => {
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