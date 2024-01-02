/*
  Warnings:

  - You are about to drop the column `note` on the `fnbsales` table. All the data in the column will be lost.
  - Added the required column `amount` to the `FnBSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fnbsales` DROP COLUMN `note`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `foodBeverageId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FnBSales` ADD CONSTRAINT `FnBSales_foodBeverageId_fkey` FOREIGN KEY (`foodBeverageId`) REFERENCES `FoodBeverage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
