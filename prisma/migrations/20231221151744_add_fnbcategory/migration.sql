-- AlterTable
ALTER TABLE `foodbeverage` ADD COLUMN `CategoryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `FnBCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FoodBeverage` ADD CONSTRAINT `FoodBeverage_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `FnBCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
