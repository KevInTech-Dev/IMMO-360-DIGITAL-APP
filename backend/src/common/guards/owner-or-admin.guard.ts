import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../../users/dto/create-user.dto';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const targetUserId = request.params.id;

    // Si pas d'utilisateur (pas authentifié), interdire
    if (!user) {
      throw new ForbiddenException('Authentification requise pour accéder à cette ressource');
    }

    // Si admin, autoriser
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // Si propriétaire du compte, autoriser
    if (user.id === targetUserId) {
      return true;
    }

    // Sinon, interdire
    throw new ForbiddenException('Vous n\'avez pas accès à ce compte utilisateur');
  }
}
