/*
  Warnings:

  - The primary key for the `Bill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `total` on the `Bill` table. All the data in the column will be lost.
  - The `id` column on the `Bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `BillItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `BillItem` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `BillItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `BillItem` table. All the data in the column will be lost.
  - The `id` column on the `BillItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalAmount` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryItemId` to the `BillItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `BillItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `billId` on the `BillItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BillItem" DROP CONSTRAINT "BillItem_billId_fkey";

-- DropForeignKey
ALTER TABLE "BillItem" DROP CONSTRAINT "BillItem_itemId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_pkey",
DROP COLUMN "total",
ADD COLUMN     "totalAmount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BillItem" DROP CONSTRAINT "BillItem_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "itemId",
DROP COLUMN "updatedAt",
ADD COLUMN     "inventoryItemId" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "billId",
ADD COLUMN     "billId" INTEGER NOT NULL,
ADD CONSTRAINT "BillItem_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
