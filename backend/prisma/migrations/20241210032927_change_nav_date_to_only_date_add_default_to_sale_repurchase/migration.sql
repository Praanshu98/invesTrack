/*
  Warnings:

  - A unique constraint covering the columns `[isin,date]` on the table `NAV` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "NAV" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "repurchase_price" SET DEFAULT 0,
ALTER COLUMN "sale_price" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "NAV_isin_date_key" ON "NAV"("isin", "date");
