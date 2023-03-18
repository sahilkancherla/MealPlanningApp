const mongoose = require('mongoose');


const ingredientSchema = new mongoose.Schema({
    ingredientName: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    metric: {
        required: true,
        type: String
    },
});

const instructionSchema = new mongoose.Schema({
    stepNumber: {
        required: true,
        type: Number
    },
    instructionDescription: {
        required: true,
        type: String
    },
});


const recipeSchema = new mongoose.Schema({
    user: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    servings: {
        required: true,
        type: Number
    },
    prepTime: {
        required: true,
        type: Number
    },
    cookTime: {
        required: true,
        type: Number
    },
    ingredients: {
        required: true,
        type: [ingredientSchema]
    },
    instructions: {
        required: true,
        type: [instructionSchema]
    }
})



module.exports = mongoose.model('recipe', recipeSchema)