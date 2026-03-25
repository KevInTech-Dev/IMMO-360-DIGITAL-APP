import { Module } from '@nestjs/common';
import { BiensService } from './biens.service';
import { BiensController } from './biens.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BiensController],
  providers: [BiensService],
})
export class BiensModule {}
