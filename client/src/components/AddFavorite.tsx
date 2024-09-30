import React from 'react'
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogTitle, 
  DialogDescription, 
  Button 
} from '@/components/ui'

import axios from 'axios'

interface AddFavoriteProps {
  recipeID: string
}

const AddFavorite: React.FC<AddFavoriteProps> = ({recipeID}) => {

  const handleClick = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/recipes/favorites/${recipeID}`);
      console.log(response.data);
    } catch (err) {
      console.log('Failed to add recipe to favorites', err);
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button onClick={handleClick}>Add to Favorites</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Added to Favorites 💜</DialogTitle>
        <DialogDescription>
          Congrats! This recipe has been added to your favorites. 🎉 
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AddFavorite;
