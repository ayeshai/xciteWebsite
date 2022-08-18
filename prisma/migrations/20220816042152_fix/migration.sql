/*
  Warnings:

  - You are about to drop the `studentsNew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "studentClass" DROP CONSTRAINT "studentClass_studentsNewStudentID_fkey";

-- DropTable
DROP TABLE "studentsNew";

-- CreateTable
CREATE TABLE "students" (
    "ID" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "studentID" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "_studentClassTostudents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "students_ID_key" ON "students"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "_studentClassTostudents_AB_unique" ON "_studentClassTostudents"("A", "B");

-- CreateIndex
CREATE INDEX "_studentClassTostudents_B_index" ON "_studentClassTostudents"("B");

-- AddForeignKey
ALTER TABLE "_studentClassTostudents" ADD CONSTRAINT "_studentClassTostudents_A_fkey" FOREIGN KEY ("A") REFERENCES "studentClass"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentClassTostudents" ADD CONSTRAINT "_studentClassTostudents_B_fkey" FOREIGN KEY ("B") REFERENCES "students"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
