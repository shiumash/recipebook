import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const fetchRecipeData = async (q: string) => {
  const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${q}&apiKey=${process.env.SPOONACULAR_API_KEY}`);
  // Extract relevant information from the response
  return res.data.results;
};

const fetchRecipeInfo = async (id: string) => {
  const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);
  const data = res.data;

  const recipeInfo = {
    id: data.id,
    title: data.title,
    readyInMinutes: data.readyInMinutes,
    servings: data.servings,
    image: data.image,
    instructions: data.instructions,
  }

  return recipeInfo
};

const addFavRecipe = async (id: string) => {
  const recipeId = Number(id)
  return await prisma.favoriteRecipes.create({
    data: {
      recipeId: recipeId,
    },
  });
};

const getFavRecipes = async () => {
  return await prisma.favoriteRecipes.findMany();
};

const updateFavRecipe = async (id: string) => {
  const recipeId = Number(id)
  return await prisma.favoriteRecipes.update({
    where: { recipeId: recipeId },
    data: {
      recipeId: recipeId,
    },
  });
};

const removeFavRecipe = async (id: string) => {
  const recipeId = Number(id)
  return await prisma.favoriteRecipes.delete({
    where: { recipeId: recipeId },
  });
};

export {
  fetchRecipeData,
  fetchRecipeInfo,
  addFavRecipe,
  getFavRecipes,
  updateFavRecipe,
  removeFavRecipe,
}