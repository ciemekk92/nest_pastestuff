/*
  Warnings:

  - You are about to drop the `Tweets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tweets";

-- CreateTable
CREATE TABLE "Snippet" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);
