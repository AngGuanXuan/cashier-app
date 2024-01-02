/*
  Warnings:

  - You are about to drop the column `amount` on the `fnbsales` table. All the data in the column will be lost.
  - You are about to drop the column `foodBeverageId` on the `fnbsales` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fnBSalesInfoId]` on the table `FnBSales` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `fnbsales` DROP FOREIGN KEY `FnBSales_foodBeverageId_fkey`;

-- AlterTable
ALTER TABLE `fnbsales` DROP COLUMN `amount`,
    DROP COLUMN `foodBeverageId`,
    ADD COLUMN `fnBSalesInfoId` INTEGER NULL;

-- CreateTable
CREATE TABLE `FnBSalesInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foodBeverageId` INTEGER NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `FnBSales_fnBSalesInfoId_key` ON `FnBSales`(`fnBSalesInfoId`);

-- AddForeignKey
ALTER TABLE `FnBSales` ADD CONSTRAINT `FnBSales_fnBSalesInfoId_fkey` FOREIGN KEY (`fnBSalesInfoId`) REFERENCES `FnBSalesInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FnBSalesInfo` ADD CONSTRAINT `FnBSalesInfo_foodBeverageId_fkey` FOREIGN KEY (`foodBeverageId`) REFERENCES `FoodBeverage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
