-- CreateTable
CREATE TABLE "studentsNew" (
    "ID" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "studentID" INTEGER NOT NULL,

    CONSTRAINT "studentsNew_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "studentClass" (
    "ID" SERIAL NOT NULL,
    "classID" TEXT NOT NULL,
    "class_name" TEXT NOT NULL,
    "class_title" TEXT NOT NULL,
    "prof" TEXT NOT NULL,
    "studentsNewStudentID" INTEGER,

    CONSTRAINT "studentClass_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "studentsNew_ID_key" ON "studentsNew"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "studentsNew_studentID_key" ON "studentsNew"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "studentClass_ID_key" ON "studentClass"("ID");

-- AddForeignKey
ALTER TABLE "studentClass" ADD CONSTRAINT "studentClass_studentsNewStudentID_fkey" FOREIGN KEY ("studentsNewStudentID") REFERENCES "studentsNew"("studentID") ON DELETE SET NULL ON UPDATE CASCADE;
