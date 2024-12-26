-- CreateTable
CREATE TABLE "Investments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "isin_id" INTEGER NOT NULL,
    "units" DOUBLE PRECISION NOT NULL,
    "purchase_date" DATE,
    "sale_date" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Investments" ADD CONSTRAINT "Investments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investments" ADD CONSTRAINT "Investments_isin_id_fkey" FOREIGN KEY ("isin_id") REFERENCES "ISIN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Investments"
ADD CONSTRAINT check_units_sale_date 
CHECK (units >= 0 OR sale_date IS NOT NULL);
