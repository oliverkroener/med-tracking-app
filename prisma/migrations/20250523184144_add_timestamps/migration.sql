/*
  Warnings:

  - You are about to drop the column `dosage` on the `med_prescriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "med_prescriptions" DROP COLUMN "dosage";

-- CreateTable
CREATE TABLE "med_dosages" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "morning" DOUBLE PRECISION NOT NULL,
    "noon" DOUBLE PRECISION NOT NULL,
    "evening" DOUBLE PRECISION NOT NULL,
    "night" DOUBLE PRECISION NOT NULL,
    "prescription_id" TEXT NOT NULL,

    CONSTRAINT "med_dosages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "med_dosages_prescription_id_key" ON "med_dosages"("prescription_id");

-- AddForeignKey
ALTER TABLE "med_dosages" ADD CONSTRAINT "med_dosages_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "med_prescriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
