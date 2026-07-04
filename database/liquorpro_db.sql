-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: liquorpro_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0a8026ef-92e9-4eec-9e94-1c4d944e5f2a','ae3bbc40fe580ca292543fd815e6d0f6b5c5a46a0072a827377e7e97fbd3f139','2026-06-27 21:51:59.367','20260627215159_agregar_clientes',NULL,NULL,'2026-06-27 21:51:59.344',1),('2337488c-3c10-4dae-abf6-b97fedf7f7fb','169c2fb84748f734fa62f5b1ae65a5976869b74f81375be9e4a3809f32c21e65','2026-06-27 05:32:33.340','20260627053233_agregar_proveedores',NULL,NULL,'2026-06-27 05:32:33.326',1),('29848e10-c4a6-48ab-bcf8-f0b441e9a537','32e2ebbfcc501a904474f338d63b47ad8265a6b3be2964eaada229d629ea4146','2026-06-27 03:35:16.415','20260627033516_agregar_categorias_productos',NULL,NULL,'2026-06-27 03:35:16.373',1),('792e6334-5a32-46ac-88c2-2ece4f0e78cd','5da65ea547f84b3ec93a95e207e1d9a1070efd988882a03b81e17b8bad4a9ca5','2026-06-28 03:04:22.296','20260628030422_agregar_ventas',NULL,NULL,'2026-06-28 03:04:22.211',1),('b2df55c5-674f-422a-b6f3-3716caabdda3','34e7501922022c00f1d3fa3087eaca703c448bf2b3545cde353010a019cb3eb3','2026-06-26 22:32:59.655','20260626223259_init_roles_usuarios',NULL,NULL,'2026-06-26 22:32:59.605',1),('f44598fb-61ab-41d8-9bd0-b3ffe330106d','73c67dde6f50d3908d775e7aa0cf555ed76f958d958d79b486462a439f3f36b7','2026-06-27 23:18:38.878','20260627231838_agregar_compras',NULL,NULL,'2026-06-27 23:18:38.741',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `creadoEn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categorias_nombre_key` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Whisky','Bebidas tipo whisky',1,'2026-06-26 22:39:21.000','2026-06-26 22:39:21.000'),(2,'Ron','Bebidas tipo ron',1,'2026-06-26 22:39:21.000','2026-06-26 22:39:21.000'),(3,'Vodka','Bebidas tipo vodka',1,'2026-06-26 22:39:21.000','2026-06-26 22:39:21.000'),(4,'Cerveza','Cervezas nacionales e importadas',1,'2026-06-26 22:39:21.000','2026-06-26 22:39:21.000'),(5,'Vino','Vinos nacionales e importados',1,'2026-06-26 22:39:21.000','2026-06-26 22:39:21.000'),(6,'Pisco','Piscos peruanos',1,'2026-06-26 22:39:21.000','2026-06-26 22:39:21.000'),(7,'Camacho','Bebida exotica',0,'2026-07-03 23:40:00.773','2026-07-03 23:40:18.640'),(8,'Caña','Bebidas destiladas de caña de azúcar',1,'2026-07-03 23:49:52.743','2026-07-03 23:49:52.743');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `creadoEn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clientes_dni_key` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Carlos Alberto','Ramírez Torres','12345678','999111222','carlos@liquorpro.com','Av. Mariscal Cáceres 456, Ayacucho',0,'2026-06-27 22:07:24.407','2026-06-27 22:53:00.974'),(2,'María Fernanda','Quispe Huamán','87654321','966555432','maria.quispe@gmail.com','Jr. Asamblea 250, Ayacucho',1,'2026-06-28 03:44:26.224','2026-06-29 06:38:37.892'),(3,'Yunfer Bartolome','Lifoncio Torres','75062446','993880727','yunfer.lifoncio@gmail.com','Jr. los jardines de Adan',1,'2026-06-29 06:37:55.435','2026-06-29 06:37:55.435'),(4,'Carlos Alberto','Mendoza Rojas','76543123','987654321','carlos.mendoza@gmail.com','',1,'2026-07-04 00:00:39.513','2026-07-04 00:00:58.172'),(5,'gil','ttt','55222','','','',0,'2026-07-04 01:24:40.173','2026-07-04 01:24:47.174');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proveedorId` int NOT NULL,
  `fecha` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `total` decimal(10,2) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `creadoEn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `compras_proveedorId_fkey` (`proveedorId`),
  CONSTRAINT `compras_proveedorId_fkey` FOREIGN KEY (`proveedorId`) REFERENCES `proveedores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,2,'2026-06-28 00:15:16.603',375.00,1,'2026-06-28 00:15:16.603','2026-06-28 00:15:16.603'),(2,5,'2026-07-02 03:05:29.726',10.00,1,'2026-07-02 03:05:29.726','2026-07-02 03:05:29.726'),(3,4,'2026-07-02 03:06:58.087',15.00,1,'2026-07-02 03:06:58.087','2026-07-02 03:06:58.087'),(4,3,'2026-07-02 03:08:13.623',40.00,1,'2026-07-02 03:08:13.623','2026-07-02 03:08:13.623'),(5,3,'2026-07-02 03:14:13.970',40.00,1,'2026-07-02 03:14:13.970','2026-07-02 03:14:13.970'),(6,6,'2026-07-04 01:10:07.408',680.00,1,'2026-07-04 01:10:07.408','2026-07-04 01:10:07.408');
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compras`
--

DROP TABLE IF EXISTS `detalle_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `compraId` int NOT NULL,
  `productoId` int NOT NULL,
  `cantidad` int NOT NULL,
  `precioUnitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `detalle_compras_compraId_fkey` (`compraId`),
  KEY `detalle_compras_productoId_fkey` (`productoId`),
  CONSTRAINT `detalle_compras_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `compras` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `detalle_compras_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compras`
--

LOCK TABLES `detalle_compras` WRITE;
/*!40000 ALTER TABLE `detalle_compras` DISABLE KEYS */;
INSERT INTO `detalle_compras` VALUES (1,1,2,15,25.00,375.00),(2,2,3,1,10.00,10.00),(3,3,2,1,15.00,15.00),(4,4,3,2,20.00,40.00),(5,5,3,2,20.00,40.00),(6,6,4,10,68.00,680.00);
/*!40000 ALTER TABLE `detalle_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_ventas`
--

DROP TABLE IF EXISTS `detalle_ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_ventas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ventaId` int NOT NULL,
  `productoId` int NOT NULL,
  `cantidad` int NOT NULL,
  `precioUnitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `detalle_ventas_ventaId_fkey` (`ventaId`),
  KEY `detalle_ventas_productoId_fkey` (`productoId`),
  CONSTRAINT `detalle_ventas_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `detalle_ventas_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `ventas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_ventas`
--

LOCK TABLES `detalle_ventas` WRITE;
/*!40000 ALTER TABLE `detalle_ventas` DISABLE KEYS */;
INSERT INTO `detalle_ventas` VALUES (1,1,2,5,38.00,190.00),(2,2,2,1,38.00,38.00),(3,3,2,1,38.00,38.00),(4,4,2,2,38.00,76.00),(5,5,6,2,115.00,230.00);
/*!40000 ALTER TABLE `detalle_ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `marca` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `precioCompra` decimal(10,2) NOT NULL,
  `precioVenta` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `stockMinimo` int NOT NULL DEFAULT '5',
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `categoriaId` int NOT NULL,
  `creadoEn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productos_categoriaId_fkey` (`categoriaId`),
  CONSTRAINT `productos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Johnnie Walker Black Label 750 ml','Whisky escocés premium','Johnnie Walker',90.00,130.00,25,8,0,1,'2026-06-27 04:08:31.033','2026-06-27 05:15:04.819'),(2,'Pisco Queirolo Quebranta','Pisco peruano 750 ml','Queirolo',25.00,38.00,17,5,1,6,'2026-06-27 23:56:08.695','2026-07-02 05:20:36.356'),(3,'Ron Cartavio Black','Ron peruano 750 ml','Cartavio',30.00,45.00,10,4,1,2,'2026-06-29 03:58:17.262','2026-07-02 03:14:13.977'),(4,'Johnnie Walker Red Label 750 ml','Whisky escocés Red Label de 750 ml.','Johnnie Walker',68.00,95.00,20,3,1,1,'2026-07-03 22:38:06.636','2026-07-04 01:12:28.594'),(5,'Absolut Vodka 750 ml','Vodka sueco premium de 750 ml.','Absolut',55.00,78.00,15,4,1,3,'2026-07-03 22:39:37.422','2026-07-03 22:39:37.422'),(6,'Jack Daniel\'s Old No. 7','Whisky Tennessee 700 ml.','Jack Daniel\'s',82.00,115.00,0,3,1,1,'2026-07-03 22:41:44.748','2026-07-04 01:20:11.712');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ruc` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `creadoEn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `proveedores_ruc_key` (`ruc`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Distribuidora Central del Perú SAC','20601234567','987654321','contacto@centralperu.com','Av. Los Empresarios 450, Lima',0,'2026-06-27 05:54:05.481','2026-06-27 21:27:24.878'),(2,'Importadora Bebidas Premium SAC','20609998887','988777666','ventas@bebidaspremium.com','Av. Comercio 789',1,'2026-06-27 23:56:25.231','2026-07-01 21:44:04.920'),(3,'Distribuidora Andina de Licores S.A.C.','20612345678','987654321','contacto@andalicores.com','Av. Mariscal Cáceres 456, Ayacucho',1,'2026-07-01 21:40:51.054','2026-07-01 21:40:51.054'),(4,'Comercial El Buen Trago E.I.R.L.','20687654321','989112233','ventas@buentrago.pe','Jr. 28 de Julio 215, Ayacucho',1,'2026-07-01 21:41:48.663','2026-07-01 21:41:48.663'),(5,'Bebidas Premium del Perú S.A.C.','20633445566','988445566','pedidos@premiumperu.pe','Av. Ramón Castilla 120, Ayacucho',1,'2026-07-01 21:42:51.307','2026-07-01 21:42:51.307'),(6,'Distribuidora Santa Ana SAC','20608889991','966778898','ventas@santaanalicor.com','Av. Mariscal Cáceres 456',1,'2026-07-04 00:06:35.644','2026-07-04 00:06:52.042'),(7,'ddd','233','344','vvv@n.com','ddd',0,'2026-07-04 00:07:41.701','2026-07-04 00:07:45.430');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creadoEn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_nombre_key` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMINISTRADOR','2026-06-26 21:42:06.000','2026-06-26 21:42:06.000'),(2,'VENDEDOR','2026-06-26 21:42:06.000','2026-06-26 21:42:06.000');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `rolId` int NOT NULL,
  `creadoEn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_email_key` (`email`),
  KEY `usuarios_rolId_fkey` (`rolId`),
  CONSTRAINT `usuarios_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Administrador','admin@liquorpro.com','$2b$10$fDorZ./zKS5gaYnGuNLRvebD3Ss/GyR4tynWYwDPsk/Qm4pnTG31u',1,1,'2026-06-26 21:42:06.000','2026-06-26 21:42:06.000');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clienteId` int NOT NULL,
  `fecha` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `total` decimal(10,2) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `creadoEn` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `actualizadoEn` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ventas_clienteId_fkey` (`clienteId`),
  CONSTRAINT `ventas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,2,'2026-06-28 03:52:01.430',190.00,1,'2026-06-28 03:52:01.430','2026-06-28 03:52:01.430'),(2,3,'2026-07-02 05:18:07.260',38.00,1,'2026-07-02 05:18:07.260','2026-07-02 05:18:07.260'),(3,2,'2026-07-02 05:18:27.570',38.00,1,'2026-07-02 05:18:27.570','2026-07-02 05:18:27.570'),(4,3,'2026-07-02 05:20:36.352',76.00,1,'2026-07-02 05:20:36.352','2026-07-02 05:20:36.352'),(5,4,'2026-07-04 01:20:11.705',230.00,1,'2026-07-04 01:20:11.705','2026-07-04 01:20:11.705');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-03 22:05:56
