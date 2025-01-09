-- CreateTable
CREATE TABLE "error_nav_entries" (
    "id" SERIAL NOT NULL,
    "scheme_code" TEXT NOT NULL,
    "scheme_name" TEXT NOT NULL,
    "isin_payout" TEXT NOT NULL,
    "isin_reinvest" TEXT NOT NULL,
    "nav" TEXT NOT NULL,
    "repurchase_price" TEXT NOT NULL,
    "sale_price" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "error_nav_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "error_nav_entries_isin_payout_isin_reinvest_date_key" ON "error_nav_entries"("isin_payout", "isin_reinvest", "date");
