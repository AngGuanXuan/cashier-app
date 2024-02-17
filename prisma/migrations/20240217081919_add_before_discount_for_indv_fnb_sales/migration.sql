/*
  Warnings:

  - Added the required column `totalBeforeDiscount` to the `FnBSalesIndvidual` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fnbsalesindvidual` ADD COLUMN `totalBeforeDiscount` VARCHAR(191) NOT NULL;
