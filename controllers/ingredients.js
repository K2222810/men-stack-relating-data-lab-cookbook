const express = require('express');
const router = express.Router();

const Ingredient = require('../models/ingredient.js');

// Index - GET /ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.render('ingredients/index.ejs', { ingredients });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Create - POST /ingredients
router.post('/', async (req, res) => {
  try {
    // Check if ingredient already exists to prevent duplicates
    const existingIngredient = await Ingredient.findOne({
      name: new RegExp(`^${req.body.name}$`, 'i'),
    });

    if (existingIngredient) {
      return res.redirect('/ingredients');
    }

    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.redirect('/ingredients');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
