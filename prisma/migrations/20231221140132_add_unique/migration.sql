/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `FoodBeverage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Rate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Company_email_key` ON `Company`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `FoodBeverage_name_key` ON `FoodBeverage`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Rate_name_key` ON `Rate`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Table_name_key` ON `Table`(`name`);
