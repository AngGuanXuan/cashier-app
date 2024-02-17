-- CreateTable
CREATE TABLE `FnBSalesIndvidual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foodBeverageId` INTEGER NULL,
    `totalIndvFnBSales` VARCHAR(191) NOT NULL,
    `discount` VARCHAR(191) NOT NULL,
    `customerPay` VARCHAR(191) NOT NULL,
    `balance` VARCHAR(191) NOT NULL,
    `paid` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FnBSalesIndvidual` ADD CONSTRAINT `FnBSalesIndvidual_foodBeverageId_fkey` FOREIGN KEY (`foodBeverageId`) REFERENCES `FoodBeverage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
