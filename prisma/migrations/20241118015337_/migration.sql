/*
  Warnings:

  - You are about to drop the `otp_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "otp_requests" DROP CONSTRAINT "otp_requests_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropTable
DROP TABLE "otp_requests";

-- DropTable
DROP TABLE "sessions";
