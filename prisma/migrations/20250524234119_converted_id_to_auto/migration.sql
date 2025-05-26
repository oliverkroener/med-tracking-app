/*
  Warnings:

  - The primary key for the `med_dosages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `med_dosages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `med_patients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `med_patients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `med_prescriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `med_prescriptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `prescription_id` on the `med_dosages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `patient_id` on the `med_prescriptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `doctor_id` on the `med_prescriptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "med_dosages" DROP CONSTRAINT "med_dosages_prescription_id_fkey";

-- DropForeignKey
ALTER TABLE "med_prescriptions" DROP CONSTRAINT "med_prescriptions_patient_id_fkey";

-- AlterTable
ALTER TABLE "med_dosages" DROP CONSTRAINT "med_dosages_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "prescription_id",
ADD COLUMN     "prescription_id" INTEGER NOT NULL,
ADD CONSTRAINT "med_dosages_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "med_patients" DROP CONSTRAINT "med_patients_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "med_patients_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "med_prescriptions" DROP CONSTRAINT "med_prescriptions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "patient_id",
ADD COLUMN     "patient_id" INTEGER NOT NULL,
DROP COLUMN "doctor_id",
ADD COLUMN     "doctor_id" INTEGER NOT NULL,
ADD CONSTRAINT "med_prescriptions_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "med_dosages_prescription_id_key" ON "med_dosages"("prescription_id");

-- AddForeignKey
ALTER TABLE "med_prescriptions" ADD CONSTRAINT "med_prescriptions_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "med_patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "med_dosages" ADD CONSTRAINT "med_dosages_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "med_prescriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
