/*
  Warnings:

  - You are about to drop the column `rate` on the `operatetime` table. All the data in the column will be lost.
  - You are about to drop the column `rateperhour` on the `rate` table. All the data in the column will be lost.
  - Added the required column `rateafter5` to the `Rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratebefore5` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operatetime` DROP COLUMN `rate`,
    ADD COLUMN `rateId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rate` DROP COLUMN `rateperhour`,
    ADD COLUMN `rateafter5` VARCHAR(191) NOT NULL,
    ADD COLUMN `ratebefore5` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OperateTime` ADD CONSTRAINT `OperateTime_rateId_fkey` FOREIGN KEY (`rateId`) REFERENCES `Rate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
