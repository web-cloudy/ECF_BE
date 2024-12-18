import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../publicRoutes/public';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
<<<<<<< HEAD
    
=======
>>>>>>> 43dd74f0f963e49cd9d50d1832e076de55a762a7
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
   
    if (!request.cookies?.auth_token) {
      return false;  
    }

    return super.canActivate(context);
  }
}