// src/prisma.service.ts
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'file:./prisma/dev.db', // Asegúrate que esta ruta sea correcta
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Solución compatible con Prisma v6+
    process.on('beforeExit', async () => {
      await app.close();
    });
  }


  
}