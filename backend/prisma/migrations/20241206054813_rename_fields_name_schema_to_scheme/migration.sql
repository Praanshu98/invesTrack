/*
  Warnings:

  - You are about to drop the `Schema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schema_Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NAV" DROP CONSTRAINT "NAV_isin_fkey";

-- DropForeignKey
ALTER TABLE "Schema_Category" DROP CONSTRAINT "Schema_Category_code_fkey";

-- DropForeignKey
ALTER TABLE "Schema_Category" DROP CONSTRAINT "Schema_Category_plan_type_fkey";

-- DropForeignKey
ALTER TABLE "Schema_Category" DROP CONSTRAINT "Schema_Category_return_type_fkey";

-- DropTable
DROP TABLE "Schema";

-- DropTable
DROP TABLE "Schema_Category";

-- CreateTable
CREATE TABLE "Scheme" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "isin" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheme_Category" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "return_type" INTEGER NOT NULL,
    "plan_type" INTEGER NOT NULL,

    CONSTRAINT "Scheme_Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scheme_code_key" ON "Scheme"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Scheme_isin_key" ON "Scheme"("isin");

-- AddForeignKey
ALTER TABLE "NAV" ADD CONSTRAINT "NAV_isin_fkey" FOREIGN KEY ("isin") REFERENCES "Scheme"("isin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheme_Category" ADD CONSTRAINT "Scheme_Category_code_fkey" FOREIGN KEY ("code") REFERENCES "Scheme"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheme_Category" ADD CONSTRAINT "Scheme_Category_return_type_fkey" FOREIGN KEY ("return_type") REFERENCES "Return_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheme_Category" ADD CONSTRAINT "Scheme_Category_plan_type_fkey" FOREIGN KEY ("plan_type") REFERENCES "Plan_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
