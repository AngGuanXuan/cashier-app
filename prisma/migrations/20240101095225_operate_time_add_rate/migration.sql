/*
  Warnings:

  - Added the required column `rate` to the `OperateTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operatetime` ADD COLUMN `rate` VARCHAR(191) NOT NULL;
