import React from "react";
import RecipeCard from "./RecipeCard";


interface RecipeCardProps {
  title: string;
  image: string;
}
interface RecipeCardListProps {
  recipes: RecipeCardProps[];
}

export const RecipeCardList: React.FC<RecipeCardListProps> = ({ recipes }) => {
  return (
    <div className="mt-4 bg-inherit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.isArray(recipes) && recipes.length > 0 ? recipes.map((recipe: any, index: number) => (
        <RecipeCard key={index} title={recipe.title} image={recipe.image} recipeID={recipe.id} />
      )) : <p>No recipes found 😞</p>}
    </div>
  )
}