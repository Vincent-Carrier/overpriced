-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "hipstery" BOOLEAN NOT NULL DEFAULT false
);
