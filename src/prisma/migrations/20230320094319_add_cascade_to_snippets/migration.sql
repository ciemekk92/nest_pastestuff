-- DropForeignKey
ALTER TABLE "SnippetMetadata" DROP CONSTRAINT "SnippetMetadata_snippetId_fkey";

-- AddForeignKey
ALTER TABLE "SnippetMetadata" ADD CONSTRAINT "SnippetMetadata_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
