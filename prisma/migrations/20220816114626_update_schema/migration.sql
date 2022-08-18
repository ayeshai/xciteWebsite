/*
  Warnings:

  - You are about to drop the column `studentsNewStudentID` on the `studentClass` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_classId_fkey";

-- AlterTable
ALTER TABLE "studentClass" DROP COLUMN "studentsNewStudentID",
ADD COLUMN     "studentID" INTEGER;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "classId";

-- AddForeignKey
ALTER TABLE "studentClass" ADD CONSTRAINT "studentClass_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "students"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
