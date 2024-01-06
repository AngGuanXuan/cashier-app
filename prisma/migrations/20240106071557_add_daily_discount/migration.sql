/*
  Warnings:

  - Added the required column `TotalDiscount` to the `OperateTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operatetime` ADD COLUMN `TotalDiscount` VARCHAR(191) NOT NULL;
