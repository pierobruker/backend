/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cuenta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cliente";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cuenta";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MAE_CLIENTE" (
    "ID_EMPLEADO" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NOMBRE" TEXT NOT NULL,
    "APELLIDO" TEXT NOT NULL,
    "DNI" TEXT NOT NULL,
    "TARJETA" TEXT NOT NULL,
    "PIN_HASH" TEXT NOT NULL,
    "SALDO_ACTUAL" REAL NOT NULL DEFAULT 0,
    "ESTADO_CUENTA" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MAE_CUENTA" (
    "ID_CUENTA" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NUMERO_CUENTA" TEXT NOT NULL,
    "TIPO_MONEDA" TEXT NOT NULL,
    "SALDO" REAL NOT NULL DEFAULT 0,
    "ESTADO" TEXT NOT NULL,
    "ID_CLIENTE" INTEGER NOT NULL,
    CONSTRAINT "MAE_CUENTA_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES "MAE_CLIENTE" ("ID_EMPLEADO") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MAE_CLIENTE_DNI_key" ON "MAE_CLIENTE"("DNI");

-- CreateIndex
CREATE UNIQUE INDEX "MAE_CUENTA_NUMERO_CUENTA_key" ON "MAE_CUENTA"("NUMERO_CUENTA");
