import { 
  fetchRecipeData, 
  fetchRecipeInfo, 
  addFavRecipe, 
  getFavRecipes, 
  updateFavRecipe, 
  removeFavRecipe 
} from '../services/spoonacularService';

/* getRecipe, getRecipeInfo, getFavorites, addFavorite, removeFavorite, updateFavorite */

/* Here, I'll be the middle man and make the request to the Spoonacular API for the data 
that the client wants while adding on the API key. This ensures a layer of security as 
the client doesn't have access to the API key. */

import { Request, Response, NextFunction } from 'express';

const getRecipe = async (req: Request, res: Response, next: NextFunction) => {
  const query: string = req.query.query as string;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }
  if (query.length < 3) {
    return res.status(400).json({ error: 'Query must be at least 3 characters long' });
  }
  if (query.length > 100) {
    return res.status(400).json({ error: 'Query must be at most 100 characters long' });
  }
  try {
    const data = await fetchRecipeData(query);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getRecipeInfo = async (req: Request, res: Response, next: NextFunction) => {
  const recipeID = req.params.recipeID;
  if (!recipeID) {
    return res.status(400).json({ error: 'Missing recipeID parameter' });
  }
  try {
    const data = await fetchRecipeInfo(recipeID);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getFavRecipes();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const recipeID = req.body.recipeID;
  if (!recipeID) {
    return res.status(400).json({ error: 'Missing recipeID parameter' });
  }
  try {
    const data = await addFavRecipe(recipeID);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const recipeID = req.params.recipeID;
  if (!recipeID) {
    return res.status(400).json({ error: 'Missing recipeID parameter' });
  }
  try {
    const data = await removeFavRecipe(recipeID);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const updateFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const recipeID = req.params.recipeID;
  if (!recipeID) {
    return res.status(400).json({ error: 'Missing recipeID parameter' });
  }
  try {
    const data = await updateFavRecipe(recipeID);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export {
  getRecipe,
  getRecipeInfo,
  getFavorites,
  addFavorite,
  removeFavorite,
  updateFavorite,
};