import express from 'express';
import {
  getRecipe,
  getRecipeInfo,
  getFavorites,
  addFavorite,
  removeFavorite,
  updateFavorite
} from '../controllers/recipeController';

const router = express.Router();

router.get('/recipeQuery', getRecipe);

router.get('/:recipeID/info', getRecipeInfo);

router.get('/favorites', getFavorites)

router.route('/favorites/:recipeID')
  .post(addFavorite)
  .delete(removeFavorite)
  .put(updateFavorite);

export default router;