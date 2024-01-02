/*
  Warnings:

  - Added the required column `amount` to the `FnBSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fnbsales` ADD COLUMN `amount` INTEGER NOT NULL;
