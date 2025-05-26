-- AlterTable
ALTER TABLE "med_dosages" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "med_patients" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "med_prescriptions" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
