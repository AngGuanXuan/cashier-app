/*
  Warnings:

  - You are about to drop the column `CategoryId` on the `fnbsales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `fnbsales` DROP FOREIGN KEY `FnBSales_CategoryId_fkey`;

-- AlterTable
ALTER TABLE `fnbsales` DROP COLUMN `CategoryId`;
