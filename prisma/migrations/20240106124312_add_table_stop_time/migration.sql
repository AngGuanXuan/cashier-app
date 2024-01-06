/*
  Warnings:

  - Added the required column `tableStopTime` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `tableStopTime` DATETIME(3) NOT NULL;
