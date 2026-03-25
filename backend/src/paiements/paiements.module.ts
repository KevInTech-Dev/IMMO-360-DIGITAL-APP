import { Module } from '@nestjs/common';
import { PaiementsService } from './paiements.service';
import { PaiementsController } from './paiements.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PaydunyaService } from './paydunya.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaiementsController],
  providers: [PaiementsService, PaydunyaService],
  exports: [PaiementsService, PaydunyaService],
})
export class PaiementsModule {}
