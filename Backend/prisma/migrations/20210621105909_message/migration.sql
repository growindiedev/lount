/*
  Warnings:

  - Made the column `updatedAt` on table `messages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "imageUrl" SET NOT NULL;
