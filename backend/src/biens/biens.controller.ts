import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BiensService } from './biens.service';
import { CreateBienDto } from './dto/create-bien.dto';
import { UpdateBienDto } from './dto/update-bien.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/dto/create-user.dto';

@Controller('biens')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BiensController {
  constructor(private readonly biensService: BiensService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.PROPRIETAIRE)
  create(@Body() createBienDto: CreateBienDto) {
    return this.biensService.create(createBienDto);
  }

  @Get()
  findAll() {
    return this.biensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biensService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PROPRIETAIRE)
  update(@Param('id') id: string, @Body() updateBienDto: UpdateBienDto) {
    return this.biensService.update(id, updateBienDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.PROPRIETAIRE)
  remove(@Param('id') id: string) {
    return this.biensService.remove(id);
  }
}
