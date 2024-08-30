-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `Log_userId_fkey`;

-- DropIndex
DROP INDEX `Log_id_key` ON `log`;

-- AlterTable
ALTER TABLE `user` MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;
