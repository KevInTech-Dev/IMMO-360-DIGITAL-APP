import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Cet email est déjà enregistré');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          role: UserRole.CLIENT, // Par défaut, tous les nouveaux utilisateurs sont des clients
          password: hashedPassword,
        },
      });

      // Ne pas retourner le mot de passe
      const { password, ...result } = user;
      this.logger.log(`Nouvel utilisateur créé: ${user.email}`);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erreur lors de la création de l'utilisateur: ${errorMessage}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        where: { isActive: true },
        select: {
          id: true,
          email: true,
          nom: true,
          telephone: true,
          role: true,
          photoUrl: true,
          createdAt: true,
          isActive: true,
        },
      });
      this.logger.log(`Récupération de la liste de ${users.length} utilisateurs`);
      return users;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erreur lors de la récupération des utilisateurs: ${errorMessage}`);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          nom: true,
          telephone: true,
          role: true,
          photoUrl: true,
          createdAt: true,
          isActive: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`Utilisateur ${id} non trouvé`);
      }

      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erreur lors de la récupération de l'utilisateur ${id}: ${errorMessage}`);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      // Vérifier que l'utilisateur existe
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException(`Utilisateur ${id} non trouvé`);
      }

      // Si le mot de passe est fourni, le hasher
      const updateData: any = { ...updateUserDto };
      if (updateUserDto.password) {
        updateData.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // Ne pas permettre de modifier le rôle (sauf admin via autre endpoint)
      delete updateData.role;

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          nom: true,
          telephone: true,
          role: true,
          photoUrl: true,
          createdAt: true,
          isActive: true,
        },
      });

      this.logger.log(`Utilisateur ${id} mis à jour`);
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erreur lors de la mise à jour de l'utilisateur ${id}: ${errorMessage}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException(`Utilisateur ${id} non trouvé`);
      }

      await this.prisma.user.update({
        where: { id },
        data: { isActive: false },
      });

      this.logger.log(`Utilisateur ${id} supprimé (soft delete)`);
      return { success: true, message: 'Compte utilisateur supprimé avec succès' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erreur lors de la suppression de l'utilisateur ${id}: ${errorMessage}`);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erreur lors de la recherche par email ${email}: ${errorMessage}`);
      throw error;
    }
  }

  async updatePhoto(userId: string, file: { buffer: Buffer; mimetype?: string; originalname?: string }) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('Utilisateur introuvable');

      const result = await this.cloudinary.uploadImage(file, 'immo360/profiles');

      const secureUrl = 'secure_url' in result ? result.secure_url : null;
      if (!secureUrl) {
        throw new Error('Échec du téléchargement sur Cloudinary');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { photoUrl: secureUrl },
        select: {
          id: true,
          email: true,
          nom: true,
          telephone: true,
          role: true,
          photoUrl: true,
          createdAt: true,
          isActive: true,
        },
      });

      this.logger.log(`Photo de profil mise à jour pour l'utilisateur ${userId}`);
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erreur lors de la mise à jour de la photo ${userId}: ${errorMessage}`);
      throw error;
    }
  }
}
