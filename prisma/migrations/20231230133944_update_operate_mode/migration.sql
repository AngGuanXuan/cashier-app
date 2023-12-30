/*
  Warnings:

  - Added the required column `mode` to the `OperateTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operatetime` ADD COLUMN `mode` VARCHAR(191) NOT NULL;
