-- AlterTable
ALTER TABLE `fnbsales` MODIFY `totalFnBSales` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tablesales` MODIFY `totalTableSales` VARCHAR(191) NOT NULL,
    MODIFY `tableRateSales` VARCHAR(191) NOT NULL,
    MODIFY `totalFnBSales` VARCHAR(191) NOT NULL;
