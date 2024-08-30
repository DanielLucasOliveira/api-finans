-- DropIndex
DROP INDEX `Log_userId_fkey` ON `log`;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
