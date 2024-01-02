-- AlterTable
ALTER TABLE `fnbsalesinfo` ADD COLUMN `tableSalesId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FnBSalesInfo` ADD CONSTRAINT `FnBSalesInfo_tableSalesId_fkey` FOREIGN KEY (`tableSalesId`) REFERENCES `TableSales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
