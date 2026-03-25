import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { BiensModule } from './biens/biens.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaiementsModule } from './paiements/paiements.module';

@Module({
  imports: [PrismaModule, UsersModule, BiensModule, ReservationsModule, PaiementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
