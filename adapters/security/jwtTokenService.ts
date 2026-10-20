import { createHmac, timingSafeEqual } from 'node:crypto'
import type { Usuario } from '../../types/entities.js'
import type { TokenClaims } from '../../types/services.js'

const JWT_SECRET = process.env.JWT_SECRET || 'modarg-admin-development-secret'
const TOKEN_DURATION_SECONDS = 60 * 60

export function createToken(user: Usuario): string {
    const now = Math.floor(Date.now() / 1000)
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
    const payload = Buffer.from(JSON.stringify({
        sub: user.username,
        role: user.role,
        name: user.name,
        surname: user.surname,
        iat: now,
        exp: now + TOKEN_DURATION_SECONDS,
    })).toString('base64url')
    const unsignedToken = `${header}.${payload}`
    const signature = createHmac('sha256', JWT_SECRET)
        .update(unsignedToken)
        .digest('base64url')

    return `${unsignedToken}.${signature}`
}

export function verifyToken(token: string): TokenClaims | null {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [encodedHeader, encodedPayload, encodedSignature] = parts
    let header: { alg?: unknown; typ?: unknown } | null
    let payload: TokenClaims | null

    try {
        header = JSON.parse(Buffer.from(encodedHeader, 'base64url').toString('utf8'))
        payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))
    } catch {
        return null
    }

    if (header?.alg !== 'HS256' || header?.typ !== 'JWT') return null

    const unsignedToken = `${encodedHeader}.${encodedPayload}`
    const expectedSignature = createHmac('sha256', JWT_SECRET)
        .update(unsignedToken)
        .digest()
    let suppliedSignature: Buffer

    try {
        suppliedSignature = Buffer.from(encodedSignature, 'base64url')
    } catch {
        return null
    }

    if (
        suppliedSignature.length !== expectedSignature.length ||
        !timingSafeEqual(suppliedSignature, expectedSignature)
    ) {
        return null
    }

    const now = Math.floor(Date.now() / 1000)
    if (!payload || !Number.isFinite(payload.exp) || payload.exp <= now) return null

    return payload
}
