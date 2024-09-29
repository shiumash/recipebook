import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";

import data from "./data.json";

function App() {
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
    <div className='w-screen h-full m-0 bg-slate-100 flex flex-col justify-start items-center'>
      <div className="flex w-1/3 h-24 my-16 justify-center items-center">
        <h1 className="text-7xl font-extrabold tracking-wide">recipebook.</h1>
      </div>
      <div className="flex bg-slate-200/60 rounded-3xl w-3/4 min-h-36 h-auto mb-32 justify-center p-12 pt-10">
        <Tabs defaultValue="recipe-search" className="w-full">
          <TabsList className="flex justify-start bg-inherit">
            <TabsTrigger className="text-lg" value="recipe-search">Recipe Search</TabsTrigger>
            <TabsTrigger className="text-lg" value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="recipe-search">
            <Input 
              type="text"
              className="text-lg mt-4" 
              placeholder="'Pasta'"
              value={searchTerm}
              onChange={handleChange}
            />
            <div className="mt-4 bg-inherit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(recipes) && recipes.length > 0 ? recipes.map((recipe: any, index: number) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>{recipe.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
                  </CardContent>
                  <CardFooter>
                    <button>Add to Favorites</button>
                  </CardFooter>
                </Card>
              )) : <p>No recipes found.</p>}
            </div>
          </TabsContent>
          <TabsContent value="favorites">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(favorites) && favorites.length > 0 ? favorites.map((favorite: any, index: number) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>{favorite.recipeId}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <button>Remove from Favorites</button>
                  </CardFooter>
                </Card>
              )) : <p>No favorites found.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;