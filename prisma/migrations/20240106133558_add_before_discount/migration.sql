/*
  Warnings:

  - Added the required column `totalBeforeDiscount` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `totalBeforeDiscount` VARCHAR(191) NOT NULL;
