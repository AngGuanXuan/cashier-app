/*
  Warnings:

  - You are about to drop the column `fnBCategoryId` on the `fnbsales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `fnbsales` DROP FOREIGN KEY `FnBSales_fnBCategoryId_fkey`;

-- AlterTable
ALTER TABLE `fnbsales` DROP COLUMN `fnBCategoryId`,
    ADD COLUMN `CategoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FnBSales` ADD CONSTRAINT `FnBSales_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `FnBCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
