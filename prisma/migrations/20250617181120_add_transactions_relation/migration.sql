-- CreateTable
CREATE TABLE "TRS_TRANSACCION" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cuentaId" INTEGER NOT NULL,
    "monto" REAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "fechaHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saldoResultante" REAL NOT NULL,
    CONSTRAINT "TRS_TRANSACCION_cuentaId_fkey" FOREIGN KEY ("cuentaId") REFERENCES "MAE_CUENTA" ("ID_CUENTA") ON DELETE RESTRICT ON UPDATE CASCADE
);
