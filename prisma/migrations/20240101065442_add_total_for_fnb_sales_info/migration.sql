/*
  Warnings:

  - Added the required column `TotalUnitSales` to the `FnBSalesInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fnbsalesinfo` ADD COLUMN `TotalUnitSales` VARCHAR(191) NOT NULL;
