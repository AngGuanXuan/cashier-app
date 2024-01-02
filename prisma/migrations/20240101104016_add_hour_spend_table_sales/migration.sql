/*
  Warnings:

  - Added the required column `hourSpend` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `hourSpend` VARCHAR(191) NOT NULL;
