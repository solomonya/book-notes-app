/*
  Warnings:

  - You are about to drop the column `descriptrion` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "descriptrion",
ADD COLUMN     "description" TEXT;
