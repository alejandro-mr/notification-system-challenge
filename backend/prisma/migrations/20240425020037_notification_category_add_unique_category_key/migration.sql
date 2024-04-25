/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `NotificationCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NotificationCategory_category_key" ON "NotificationCategory"("category");
