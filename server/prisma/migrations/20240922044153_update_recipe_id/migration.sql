-- CreateTable
CREATE TABLE "FavoriteRecipes" (
    "id" SERIAL NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "FavoriteRecipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteRecipes_recipeId_key" ON "FavoriteRecipes"("recipeId");
