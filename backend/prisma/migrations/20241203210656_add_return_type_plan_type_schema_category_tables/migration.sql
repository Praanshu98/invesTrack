-- CreateTable
CREATE TABLE "Return_Type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Return_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Plan_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schema_Category" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "return_type" INTEGER NOT NULL,
    "plan_type" INTEGER NOT NULL,

    CONSTRAINT "Schema_Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schema_Category" ADD CONSTRAINT "Schema_Category_code_fkey" FOREIGN KEY ("code") REFERENCES "Schema"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schema_Category" ADD CONSTRAINT "Schema_Category_return_type_fkey" FOREIGN KEY ("return_type") REFERENCES "Return_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schema_Category" ADD CONSTRAINT "Schema_Category_plan_type_fkey" FOREIGN KEY ("plan_type") REFERENCES "Plan_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
