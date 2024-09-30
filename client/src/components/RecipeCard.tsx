import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import LearnMore from "./LearnMore";
import AddFavorite from "./AddFavorite";

interface RecipeCardProps {
  title: string;
  image: string;
  recipeID: string
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, recipeID }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={title} className="w-full h-64 object-cover" />
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <AddFavorite recipeID={recipeID}/>
        <LearnMore recipeID={recipeID}/>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;