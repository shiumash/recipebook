import React from 'react'

import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button 
} from "@/components/ui";

interface FavoriteCardProps {
  title: string;
  image: string;
  recipeID: string;
  readyInMinutes: number;
  servings: number;
  instructions: string;
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({title, image, recipeID, readyInMinutes, servings, instructions}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={title} className="w-full h-64 object-cover" />
      </CardContent>
      <CardFooter className="flex flex-col items-start">
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
  `          <div className="flex items-start flex-col">
              <h1 className="font-bold font-xl">{title}</h1>
              <p>Recipe ID: {recipeID}</p>
              <img src={image} alt={title} className="object-cover w-full" />
              <p>Ready in: {readyInMinutes} minutes</p>
              <p>Servings: {servings}</p>
              <div dangerouslySetInnerHTML={{ __html: instructions }} />
            </div>`
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive">Remove Favorite</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              Are you absolutely sure?
              <AlertDialogDescription>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
