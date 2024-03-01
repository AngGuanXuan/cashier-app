/*
  Warnings:

  - You are about to drop the column `CategoryId` on the `foodbeverage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `foodbeverage` DROP FOREIGN KEY `FoodBeverage_CategoryId_fkey`;

-- AlterTable
ALTER TABLE `foodbeverage` DROP COLUMN `CategoryId`,
    ADD COLUMN `fnBCategoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FoodBeverage` ADD CONSTRAINT `FoodBeverage_fnBCategoryId_fkey` FOREIGN KEY (`fnBCategoryId`) REFERENCES `FnBCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
