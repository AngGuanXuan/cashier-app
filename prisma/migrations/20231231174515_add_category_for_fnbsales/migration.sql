-- AlterTable
ALTER TABLE `fnbsales` ADD COLUMN `fnBCategoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FnBSales` ADD CONSTRAINT `FnBSales_fnBCategoryId_fkey` FOREIGN KEY (`fnBCategoryId`) REFERENCES `FnBCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
