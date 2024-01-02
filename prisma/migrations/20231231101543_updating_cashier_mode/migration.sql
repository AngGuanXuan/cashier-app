/*
  Warnings:

  - You are about to drop the column `foodBeverageId` on the `tablesales` table. All the data in the column will be lost.
  - Added the required column `paid` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tablesales` DROP FOREIGN KEY `TableSales_foodBeverageId_fkey`;

-- AlterTable
ALTER TABLE `operatetime` ADD COLUMN `tableSalesId` INTEGER NULL;

-- AlterTable
ALTER TABLE `tablesales` DROP COLUMN `foodBeverageId`,
    ADD COLUMN `paid` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `FnBSales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` VARCHAR(191) NOT NULL,
    `tableSalesId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OperateTime` ADD CONSTRAINT `OperateTime_tableSalesId_fkey` FOREIGN KEY (`tableSalesId`) REFERENCES `TableSales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FnBSales` ADD CONSTRAINT `FnBSales_tableSalesId_fkey` FOREIGN KEY (`tableSalesId`) REFERENCES `TableSales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
