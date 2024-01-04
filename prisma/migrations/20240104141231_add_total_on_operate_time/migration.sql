/*
  Warnings:

  - Added the required column `totalDaySales` to the `OperateTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFnBSales` to the `OperateTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTableSales` to the `OperateTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operatetime` ADD COLUMN `totalDaySales` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalFnBSales` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalTableSales` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `discount` VARCHAR(191) NOT NULL;
