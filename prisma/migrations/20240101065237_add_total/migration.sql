/*
  Warnings:

  - Added the required column `totalFnBSales` to the `FnBSales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTableSales` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fnbsales` ADD COLUMN `totalFnBSales` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `totalTableSales` VARCHAR(191) NOT NULL;
