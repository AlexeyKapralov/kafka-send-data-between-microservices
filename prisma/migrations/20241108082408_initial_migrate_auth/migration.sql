/*
  Warnings:

  - You are about to drop the `ModelPSQL1` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ModelPSQL1";

-- CreateTable
CREATE TABLE "ModelPSQL2" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "ModelPSQL2_pkey" PRIMARY KEY ("id")
);
