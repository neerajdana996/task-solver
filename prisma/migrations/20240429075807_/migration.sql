/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `UserTask` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `UserTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserTask_slug_key" ON "UserTask"("slug");
