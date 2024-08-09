/*
  Warnings:

  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Owner";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL,
    "otp" INTEGER,
    "last_login" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
