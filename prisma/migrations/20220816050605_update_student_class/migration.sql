/*
  Warnings:

  - You are about to drop the `_studentClassTostudents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_studentClassTostudents" DROP CONSTRAINT "_studentClassTostudents_A_fkey";

-- DropForeignKey
ALTER TABLE "_studentClassTostudents" DROP CONSTRAINT "_studentClassTostudents_B_fkey";

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "classId" INTEGER;

-- DropTable
DROP TABLE "_studentClassTostudents";

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "studentClass"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
