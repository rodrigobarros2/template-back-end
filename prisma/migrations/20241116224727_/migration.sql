/*
  Warnings:

  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
