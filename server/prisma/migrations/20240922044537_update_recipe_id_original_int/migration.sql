/*
  Warnings:

  - Changed the type of `recipeId` on the `FavoriteRecipes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FavoriteRecipes" DROP COLUMN "recipeId",
ADD COLUMN     "recipeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteRecipes_recipeId_key" ON "FavoriteRecipes"("recipeId");
