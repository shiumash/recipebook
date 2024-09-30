import React from 'react'
import { useEffect, useState } from "react";

import axios from "axios";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
} from "@/components/ui";

import { useDebounce } from "@uidotdev/usehooks";

import { SearchInput } from "./SearchInput";
import { RecipeCardList } from "./RecipeCardList";

export const MainContainer = () => {

  const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [favorites, setFavorites] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/recipes/recipeQuery?query=${searchTerm}`);
      console.log(response.data);
      setRecipes(response.data || []);
    } catch (err) {
      console.log('Failed to fetch recipes', err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  return (
    <div className="flex bg-slate-200/60 rounded-3xl w-3/4 min-h-36 h-auto mb-32 justify-center p-12 pt-10">
        <Tabs defaultValue="recipe-search" className="w-full">
          <TabsList className="flex justify-start bg-inherit">
            <TabsTrigger className="text-lg" value="recipe-search">Recipe Search</TabsTrigger>
            <TabsTrigger className="text-lg" value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="recipe-search">
            <SearchInput searchTerm={searchTerm} handleChange={handleChange} />
            <RecipeCardList recipes={recipes}/>
          </TabsContent>
          <TabsContent value="favorites">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              hi
            </div>
          </TabsContent>
        </Tabs>
      </div>
  )
}
