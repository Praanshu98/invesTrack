-- CreateTable
CREATE TABLE "Schema" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "isin" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NAV" (
    "id" SERIAL NOT NULL,
    "isin" INTEGER NOT NULL,
    "nav" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "repurchase_price" INTEGER NOT NULL,
    "sale_price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NAV_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schema_code_key" ON "Schema"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Schema_isin_key" ON "Schema"("isin");

-- AddForeignKey
ALTER TABLE "NAV" ADD CONSTRAINT "NAV_isin_fkey" FOREIGN KEY ("isin") REFERENCES "Schema"("isin") ON DELETE RESTRICT ON UPDATE CASCADE;
