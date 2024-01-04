/*
  Warnings:

  - Added the required column `balance` to the `TableSales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPay` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `balance` VARCHAR(191) NOT NULL,
    ADD COLUMN `customerPay` VARCHAR(191) NOT NULL;
