/*
  Warnings:

  - You are about to drop the column `price` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `priceperkg` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantitybykg` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "price",
DROP COLUMN "quantity",
ADD COLUMN     "priceperkg" INTEGER NOT NULL,
ADD COLUMN     "quantitybykg" INTEGER NOT NULL;
