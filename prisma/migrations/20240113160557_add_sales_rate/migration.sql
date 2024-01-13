/*
  Warnings:

  - Added the required column `salesRate` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `salesRate` VARCHAR(191) NOT NULL;
