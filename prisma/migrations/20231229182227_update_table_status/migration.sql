/*
  Warnings:

  - You are about to drop the column `statusId` on the `table` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `Table_statusId_fkey`;

-- AlterTable
ALTER TABLE `table` DROP COLUMN `statusId`;
