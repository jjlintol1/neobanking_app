/*
  Warnings:

  - Added the required column `avatarColor` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarTextColor` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarColor" TEXT NOT NULL,
ADD COLUMN     "avatarTextColor" TEXT NOT NULL;
