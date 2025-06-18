/*
  Warnings:

  - You are about to drop the `MAE_CLIENTE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MAE_CUENTA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TRS_TRANSACCION` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MAE_CLIENTE";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MAE_CUENTA";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TRS_TRANSACCION";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "tarjeta" TEXT NOT NULL,
    "pinHash" TEXT NOT NULL,
    "saldoActual" REAL NOT NULL,
    "estadoCuenta" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cuenta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroCuenta" TEXT NOT NULL,
    "tipoMoneda" TEXT NOT NULL,
    "saldo" REAL NOT NULL,
    "estado" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Cuenta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cajero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ubicacion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "efectivoDisponible" REAL NOT NULL,
    "agenciaId" INTEGER NOT NULL,
    CONSTRAINT "Cajero_agenciaId_fkey" FOREIGN KEY ("agenciaId") REFERENCES "Agencia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Agencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "detalleDelCambio" TEXT NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" DATETIME,
    "usuarioCreacion" TEXT NOT NULL,
    "usuarioModificacion" TEXT,
    "estado" TEXT NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,
    "administradorId" INTEGER NOT NULL,
    CONSTRAINT "Auditoria_administradorId_fkey" FOREIGN KEY ("administradorId") REFERENCES "Administrador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tecnico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mantenimiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tecnicoId" INTEGER NOT NULL,
    "cajeroId" INTEGER NOT NULL,
    CONSTRAINT "Mantenimiento_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "Tecnico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mantenimiento_cajeroId_fkey" FOREIGN KEY ("cajeroId") REFERENCES "Cajero" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoTransaccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transaccion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monto" REAL NOT NULL,
    "fechaHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saldoResultante" REAL NOT NULL,
    "estado" TEXT NOT NULL,
    "cuentaId" INTEGER NOT NULL,
    "cajeroId" INTEGER NOT NULL,
    "tipoTransaccionId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Transaccion_cuentaId_fkey" FOREIGN KEY ("cuentaId") REFERENCES "Cuenta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaccion_cajeroId_fkey" FOREIGN KEY ("cajeroId") REFERENCES "Cajero" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaccion_tipoTransaccionId_fkey" FOREIGN KEY ("tipoTransaccionId") REFERENCES "TipoTransaccion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaccion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "clienteId" INTEGER,
    "administradorId" INTEGER,
    CONSTRAINT "Evento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Evento_administradorId_fkey" FOREIGN KEY ("administradorId") REFERENCES "Administrador" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_dni_key" ON "Cliente"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_tarjeta_key" ON "Cliente"("tarjeta");

-- CreateIndex
CREATE UNIQUE INDEX "Cuenta_numeroCuenta_key" ON "Cuenta"("numeroCuenta");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_usuario_key" ON "Administrador"("usuario");
