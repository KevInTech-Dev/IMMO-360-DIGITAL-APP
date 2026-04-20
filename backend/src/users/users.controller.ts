import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { OwnerOrAdminGuard } from '../common/guards/owner-or-admin.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OptionalAuth } from '../common/decorators/optional-auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Utilisateurs')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @OptionalAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Créer un nouveau compte utilisateur (inscription publique)' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('upload-photo/:id')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerOrAdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Télécharger une photo de profil' })
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.updatePhoto(id, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer la liste de tous les utilisateurs (Admin uniquement)' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Récupérer les informations d\'un utilisateur' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerOrAdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Modifier un compte utilisateur (proprio ou admin)' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, OwnerOrAdminGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Supprimer un compte utilisateur (proprio ou admin)' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
