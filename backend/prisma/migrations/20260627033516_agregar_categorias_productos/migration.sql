-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categorias_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(150) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `marca` VARCHAR(100) NULL,
    `precioCompra` DECIMAL(10, 2) NOT NULL,
    `precioVenta` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `stockMinimo` INTEGER NOT NULL DEFAULT 5,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `categoriaId` INTEGER NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
