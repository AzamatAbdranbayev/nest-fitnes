import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthSuperAdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token = req.headers.authorization
            if (!token) {
                throw new HttpException(
                    'Пользователь не авторизован',
                    HttpStatus.BAD_REQUEST,
                )
            }
            const user = this.jwtService.verify(token, {
                secret: process.env.JWT_KEY,
            })
            req.user = user
            return true
        } catch (e) {
            throw new HttpException(
                'Пользователь не авторизован',
                HttpStatus.BAD_REQUEST,
            )
        }
    }
}
