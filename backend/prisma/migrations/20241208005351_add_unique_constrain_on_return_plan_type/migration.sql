/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Plan_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Return_Type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plan_type_name_key" ON "Plan_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Return_Type_name_key" ON "Return_Type"("name");
