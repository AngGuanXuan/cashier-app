/*
  Warnings:

  - You are about to alter the column `totalFnBSales` on the `fnbsales` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,2)`.
  - You are about to alter the column `totalTableSales` on the `tablesales` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,2)`.
  - Added the required column `tableRateSales` to the `TableSales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFnBSales` to the `TableSales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fnbsales` MODIFY `totalFnBSales` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `tablesales` ADD COLUMN `tableRateSales` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `totalFnBSales` DECIMAL(10, 2) NOT NULL,
    MODIFY `totalTableSales` DECIMAL(10, 2) NOT NULL;
