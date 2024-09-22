import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";

function App() {
  const [searchTerm, setSearchTerm] = useState("burgers");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/recipes/recipeQuery?query=${debouncedSearchTerm}`);
      setRecipes(response.data.results || []);
      setError(null); // Clear any previous errors
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('/api/recipes/favorites');
      setFavorites(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch favorites', err);
    }
  };

  const addFavorite = async (recipeId: number) => {
    try {
      await axios.post('/api/recipes/favorites', { recipeID: recipeId });
      fetchFavorites();
    } catch (err) {
      console.error('Failed to add favorite', err);
    }
  };

  const removeFavorite = async (recipeId: number) => {
    try {
      await axios.delete(`/api/recipes/favorites/${recipeId}`);
      fetchFavorites();
    } catch (err) {
      console.error('Failed to remove favorite', err);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className='w-screen h-screen m-0 bg-slate-100 flex flex-col justify-start items-center'>
      <div className="flex w-1/3 h-24 my-16 justify-center items-center">
        <h1 className="text-7xl font-extrabold tracking-wide">recipebook.</h1>
      </div>
      <div className="flex bg-slate-200/60 rounded-3xl w-3/4 h-full min-h-36 h-auto justify-center p-12 pt-10">
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(recipes) && recipes.length > 0 ? recipes.map((recipe: any, index: number) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>{recipe.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={recipe.image} alt={recipe.title} className="w-full h-auto" />
                  </CardContent>
                  <CardFooter>
                    <button onClick={() => addFavorite(recipe.id)}>Add to Favorites</button>
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
                    <button onClick={() => removeFavorite(favorite.recipeId)}>Remove from Favorites</button>
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