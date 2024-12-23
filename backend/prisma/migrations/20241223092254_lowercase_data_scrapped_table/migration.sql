/*
  Warnings:

  - You are about to drop the `Date_Scrapped` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Date_Scrapped";

-- CreateTable
CREATE TABLE "date_scrapped" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "date_scrapped_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "date_scrapped_date_key" ON "date_scrapped"("date");
