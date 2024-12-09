/*
  Warnings:

  - You are about to drop the `Return_Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ISIN" DROP CONSTRAINT "ISIN_return_type_fkey";

-- DropTable
DROP TABLE "Return_Type";

-- CreateTable
CREATE TABLE "Return_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Return_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Return_type_name_key" ON "Return_type"("name");

-- AddForeignKey
ALTER TABLE "ISIN" ADD CONSTRAINT "ISIN_return_type_fkey" FOREIGN KEY ("return_type") REFERENCES "Return_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
