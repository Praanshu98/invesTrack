/*
  Warnings:

  - You are about to drop the column `isin` on the `Scheme` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Scheme` table. All the data in the column will be lost.
  - You are about to drop the `Scheme_Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NAV" DROP CONSTRAINT "NAV_isin_fkey";

-- DropForeignKey
ALTER TABLE "Scheme_Category" DROP CONSTRAINT "Scheme_Category_code_fkey";

-- DropForeignKey
ALTER TABLE "Scheme_Category" DROP CONSTRAINT "Scheme_Category_plan_type_fkey";

-- DropForeignKey
ALTER TABLE "Scheme_Category" DROP CONSTRAINT "Scheme_Category_return_type_fkey";

-- DropIndex
DROP INDEX "Scheme_isin_key";

-- AlterTable
ALTER TABLE "Scheme" DROP COLUMN "isin",
DROP COLUMN "name";

-- DropTable
DROP TABLE "Scheme_Category";

-- CreateTable
CREATE TABLE "ISIN" (
    "id" SERIAL NOT NULL,
    "isin" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "plan_type" INTEGER NOT NULL,
    "return_type" INTEGER NOT NULL,
    "scheme_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ISIN_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ISIN_isin_key" ON "ISIN"("isin");

-- AddForeignKey
ALTER TABLE "ISIN" ADD CONSTRAINT "ISIN_scheme_id_fkey" FOREIGN KEY ("scheme_id") REFERENCES "Scheme"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ISIN" ADD CONSTRAINT "ISIN_plan_type_fkey" FOREIGN KEY ("plan_type") REFERENCES "Plan_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ISIN" ADD CONSTRAINT "ISIN_return_type_fkey" FOREIGN KEY ("return_type") REFERENCES "Return_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NAV" ADD CONSTRAINT "NAV_isin_fkey" FOREIGN KEY ("isin") REFERENCES "ISIN"("isin") ON DELETE RESTRICT ON UPDATE CASCADE;
