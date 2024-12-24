/*
  Warnings:

  - You are about to drop the `date_scrapped` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "date_scrapped";

-- CreateTable
CREATE TABLE "Date_scrapped" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Date_scrapped_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Date_scrapped_date_key" ON "Date_scrapped"("date");
