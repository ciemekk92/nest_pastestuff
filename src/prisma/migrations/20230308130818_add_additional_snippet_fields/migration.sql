-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "isProtected" BOOLEAN DEFAULT false,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
