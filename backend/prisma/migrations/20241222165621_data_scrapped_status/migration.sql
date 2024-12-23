-- CreateTable
CREATE TABLE "Date_Scrapped" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Date_Scrapped_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Date_Scrapped_date_key" ON "Date_Scrapped"("date");
