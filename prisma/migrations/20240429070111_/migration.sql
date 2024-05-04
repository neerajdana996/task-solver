/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_userId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserActivity";

-- CreateTable
CREATE TABLE "UserTask" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB NOT NULL,

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("id")
);
