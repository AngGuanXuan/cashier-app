/*
  Warnings:

  - You are about to drop the column `foodBeverageId` on the `fnbsalesindvidual` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `fnbsalesindvidual` DROP FOREIGN KEY `FnBSalesIndvidual_foodBeverageId_fkey`;

-- AlterTable
ALTER TABLE `fnbsales` ADD COLUMN `fnBSalesIndvidualId` INTEGER NULL;

-- AlterTable
ALTER TABLE `fnbsalesindvidual` DROP COLUMN `foodBeverageId`;

-- AddForeignKey
ALTER TABLE `FnBSales` ADD CONSTRAINT `FnBSales_fnBSalesIndvidualId_fkey` FOREIGN KEY (`fnBSalesIndvidualId`) REFERENCES `FnBSalesIndvidual`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
