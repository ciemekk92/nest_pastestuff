/*
  Warnings:

  - You are about to drop the column `deleteAfterHours` on the `SnippetMetadata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SnippetMetadata" DROP COLUMN "deleteAfterHours",
ADD COLUMN     "timeToLiveMs" INTEGER;
