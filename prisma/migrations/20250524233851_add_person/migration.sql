-- CreateTable
CREATE TABLE "med_patients" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "med_patients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "med_prescriptions" ADD CONSTRAINT "med_prescriptions_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "med_patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
