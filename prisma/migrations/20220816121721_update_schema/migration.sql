/*
  Warnings:

  - You are about to drop the `studentClass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "studentClass" DROP CONSTRAINT "studentClass_studentID_fkey";

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "classes" INTEGER[];

-- DropTable
DROP TABLE "studentClass";

-- CreateTable
CREATE TABLE "classes" (
    "ID" SERIAL NOT NULL,
    "classID" TEXT NOT NULL,
    "class_title" TEXT NOT NULL,
    "prof" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "classes_ID_key" ON "classes"("ID");
