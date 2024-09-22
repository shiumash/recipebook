import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const fetchRecipeData = async (q: string) => {
  const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${q}&apiKey=${process.env.SPOONACULAR_API_KEY}`);
  // Extract relevant information from the response
  const recipes = res.data.results.map((recipe: any) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
  }));
  return recipes;
};

const fetchRecipeInfo = async (id: string) => {
  const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);
  return res.data;
};

const addFavRecipe = async (id: string) => {
  return await prisma.favoriteRecipes.create({
    data: {
      recipeId: id,
    },
  });
};

const getFavRecipes = async () => {
  return await prisma.favoriteRecipes.findMany();
};

const updateFavRecipe = async (id: string) => {
  return await prisma.favoriteRecipes.update({
    where: { recipeId: id },
    data: {
      recipeId: id,
    },
  });
};

const removeFavRecipe = async (id: string) => {
  return await prisma.favoriteRecipes.delete({
    where: { recipeId: id },
  });
};

export {
  fetchRecipeData,
  fetchRecipeInfo,
  addFavRecipe,
  getFavRecipes,
  updateFavRecipe,
  removeFavRecipe,
};