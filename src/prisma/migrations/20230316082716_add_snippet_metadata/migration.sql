/*
  Warnings:

  - You are about to drop the column `isProtected` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `title` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "isProtected",
DROP COLUMN "password",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SnippetMetadata" (
    "id" TEXT NOT NULL,
    "password" TEXT,
    "snippetId" TEXT NOT NULL,

    CONSTRAINT "SnippetMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SnippetMetadata_snippetId_key" ON "SnippetMetadata"("snippetId");

-- AddForeignKey
ALTER TABLE "SnippetMetadata" ADD CONSTRAINT "SnippetMetadata_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
