-- AlterTable
ALTER TABLE `fnbsalesindvidual` ADD COLUMN `operateTimeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FnBSalesIndvidual` ADD CONSTRAINT `FnBSalesIndvidual_operateTimeId_fkey` FOREIGN KEY (`operateTimeId`) REFERENCES `OperateTime`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
