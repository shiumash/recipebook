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

router.route('/favorites')
  .get(getFavorites)
  .post(addFavorite);

router.delete('/favorites/:recipeID', removeFavorite);
router.put('/favorites/:recipeID', updateFavorite);

export default router;