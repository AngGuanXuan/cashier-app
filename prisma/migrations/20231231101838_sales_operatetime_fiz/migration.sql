/*
  Warnings:

  - You are about to drop the column `tableSalesId` on the `operatetime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `operatetime` DROP FOREIGN KEY `OperateTime_tableSalesId_fkey`;

-- AlterTable
ALTER TABLE `operatetime` DROP COLUMN `tableSalesId`;

-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `operateTimeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TableSales` ADD CONSTRAINT `TableSales_operateTimeId_fkey` FOREIGN KEY (`operateTimeId`) REFERENCES `OperateTime`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
