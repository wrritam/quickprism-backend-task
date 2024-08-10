/*
  Warnings:

  - You are about to alter the column `price` on the `InventoryItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "InventoryItem" ALTER COLUMN "price" SET DATA TYPE INTEGER;
