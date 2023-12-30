/*
  Warnings:

  - A unique constraint covering the columns `[mode]` on the table `OperateTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `OperateTime_mode_key` ON `OperateTime`(`mode`);
