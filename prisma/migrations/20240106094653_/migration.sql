/*
  Warnings:

  - You are about to drop the column `hourSpend` on the `tablesales` table. All the data in the column will be lost.
  - Added the required column `timeSpend` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tablesales` DROP COLUMN `hourSpend`,
    ADD COLUMN `timeSpend` VARCHAR(191) NOT NULL;
