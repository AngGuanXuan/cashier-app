-- AlterTable
ALTER TABLE `table` ADD COLUMN `statusId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
