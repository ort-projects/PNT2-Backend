import type { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError.js'
import type { TokenService } from '../types/services.js'

export default function makeAdminAuth(tokenService: TokenService) {
    return function adminAuth(req: Request, res: Response, next: NextFunction) {
        const authorization = req.get('Authorization') || ''
        const match = authorization.match(/^Bearer\s+(\S+)$/i)

        if (!match) {
            return next(new AppError(
                'TOKEN_MISSING',
                'Se requiere autenticación para acceder a esta ruta.',
                401,
            ))
        }

        const claims = tokenService.verifyToken(match[1])
        if (!claims) {
            return next(new AppError('TOKEN_INVALID', 'El token es inválido o expiró.', 401))
        }

        if (claims.role !== 'admin') {
            return next(new AppError(
                'ADMIN_ROLE_REQUIRED',
                'Se requiere el rol de administrador para acceder a esta ruta.',
                403,
            ))
        }

        req.auth = claims
        return next()
    }
}
