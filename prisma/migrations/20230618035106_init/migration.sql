/*
  Warnings:

  - The `isNsfw` column on the `Feed` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feed" DROP COLUMN "isNsfw",
ADD COLUMN     "isNsfw" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "IsNsfw";
