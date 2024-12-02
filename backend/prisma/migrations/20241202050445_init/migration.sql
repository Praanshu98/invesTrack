-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "refreshToken" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
