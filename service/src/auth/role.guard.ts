import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './decorators/role.decorator';
import { UtilsService } from '../core/utils.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private util: UtilsService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = this.util.getContext(context);
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = this.util.getRequest(ctx);
    const user = req['user'];
    return requiredRoles.some((role: Role | Role[]) => {
      if (typeof role === 'string') {
        return user.role === role;
      } else {
        return role.includes(user.role);
      }
    });
  }
}
