/*
  Warnings:

  - A unique constraint covering the columns `[foodBeverageId]` on the table `FnBSales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FnBSales_foodBeverageId_key` ON `FnBSales`(`foodBeverageId`);
