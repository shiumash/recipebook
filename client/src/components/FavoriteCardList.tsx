import React from "react";
import { FavoriteCard } from "./FavoriteCard";
import axios from "axios";

interface FavoriteCardProps {
  title: string;
  image: string;
  recipeID: string;
  readyInMinutes: number;
  servings: number;
  instructions: string;
}
interface FavoriteCardListProps {
  favorites: FavoriteCardProps[];
}

export const FavoriteCardList: React.FC<FavoriteCardListProps> = ({favorites}) => {

  return (
    <div className="mt-4 bg-inherit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.isArray(favorites) && favorites.length > 0 ? favorites.map((favorite: any, index: number) => (
        <FavoriteCard 
        key={index} 
        title={favorite.title} 
        image={favorite.image} 
        recipeID={favorite.id}
        readyInMinutes={favorite.readyInMinutes}
        servings={favorite.servings}
        instructions={favorite.instructions} />
      )) : <p>Favorite recipes not added yet!</p>}
    </div>
  )
}