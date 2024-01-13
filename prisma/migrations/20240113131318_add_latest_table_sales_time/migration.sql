/*
  Warnings:

  - Added the required column `LatestTableSalesTime` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `table` ADD COLUMN `LatestTableSalesTime` DATETIME(3) NOT NULL;
