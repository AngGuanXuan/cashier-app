-- AlterTable
ALTER TABLE `fnbsales` ADD COLUMN `operateTimeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FnBSales` ADD CONSTRAINT `FnBSales_operateTimeId_fkey` FOREIGN KEY (`operateTimeId`) REFERENCES `OperateTime`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
