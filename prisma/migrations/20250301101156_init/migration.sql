/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `Expense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Expense_userid_key" ON "Expense"("userid");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
