/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `BillItem` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "BillItem" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
