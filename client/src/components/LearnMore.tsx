
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from "@/components/ui"
import { useEffect, useState } from "react";
import axios from "axios";

interface LearnMoreProps {
  recipeID: string;
}

interface RecipeInfoState {
  id: number,
  title: string,
  readyInMinutes: number,
  servings: number,
  image: string,
  summary: string,
  instructions: string,
}

const LearnMore: React.FC<LearnMoreProps> = ({recipeID}) => {

  const [recipeInfo, setRecipeInfo] = useState<RecipeInfoState | null>(null)

  const fetchRecipeInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/recipes/${recipeID}/info`);
      setRecipeInfo(response.data);
    } catch (err) {
      console.log('Failed to fetch recipe info', err);
    }
  }

  useEffect(() => {
    if (recipeID) {
      fetchRecipeInfo();
    }
  }, [recipeID])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2" variant="secondary">Learn more</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Learn more</DialogTitle>
          <DialogDescription>
            Let's learn more about this specific recipe!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-start flex-col">
          {recipeInfo ? (
            <>
              <h1 className="font-bold font-xl">{recipeInfo.title}</h1>
              <p>Recipe ID: {recipeInfo.id}</p>
              <img src={recipeInfo.image} alt={recipeInfo.title} className="object-cover w-full" />
              <p>Ready in: {recipeInfo.readyInMinutes} minutes</p>
              <p>Servings: {recipeInfo.servings}</p>
              <div dangerouslySetInnerHTML={{ __html: recipeInfo.instructions }} />
            </>
          ) : <p>Loading... ⏰</p>}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LearnMore;
