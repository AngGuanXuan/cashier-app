/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `FoodBeverage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FoodBeverage_id_key` ON `FoodBeverage`(`id`);
