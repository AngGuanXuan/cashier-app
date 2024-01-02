/*
  Warnings:

  - You are about to drop the column `fnBSalesInfoId` on the `fnbsales` table. All the data in the column will be lost.
  - You are about to drop the `fnbsalesinfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fnbsales` DROP FOREIGN KEY `FnBSales_fnBSalesInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `fnbsalesinfo` DROP FOREIGN KEY `FnBSalesInfo_foodBeverageId_fkey`;

-- DropForeignKey
ALTER TABLE `fnbsalesinfo` DROP FOREIGN KEY `FnBSalesInfo_tableSalesId_fkey`;

-- AlterTable
ALTER TABLE `fnbsales` DROP COLUMN `fnBSalesInfoId`,
    ADD COLUMN `foodBeverageId` INTEGER NULL;

-- DropTable
DROP TABLE `fnbsalesinfo`;

-- AddForeignKey
ALTER TABLE `FnBSales` ADD CONSTRAINT `FnBSales_foodBeverageId_fkey` FOREIGN KEY (`foodBeverageId`) REFERENCES `FoodBeverage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
