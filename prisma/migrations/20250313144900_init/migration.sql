/*
  Warnings:

  - You are about to drop the column `pulseReading` on the `SensorReading` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SensorReading" DROP COLUMN "pulseReading",
ADD COLUMN     "breathReading" DOUBLE PRECISION;
