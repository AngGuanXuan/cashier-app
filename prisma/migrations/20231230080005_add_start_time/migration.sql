-- CreateTable
CREATE TABLE `TableSales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableId` INTEGER NULL,
    `note` VARCHAR(191) NOT NULL,
    `foodBeverageId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OperateTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TableSales` ADD CONSTRAINT `TableSales_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableSales` ADD CONSTRAINT `TableSales_foodBeverageId_fkey` FOREIGN KEY (`foodBeverageId`) REFERENCES `FoodBeverage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
