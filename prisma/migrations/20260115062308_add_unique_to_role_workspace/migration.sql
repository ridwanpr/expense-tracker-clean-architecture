/*
  Warnings:

  - A unique constraint covering the columns `[workspace_id,name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `roles_workspace_id_name_key` ON `roles`(`workspace_id`, `name`);
