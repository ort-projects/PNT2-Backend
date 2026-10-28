import type { TokenClaims } from "./services.js";

// Agrega a Request la propiedad `auth` que completan los middlewares de autenticación.
declare global {
    namespace Express {
        interface Request {
            auth?: TokenClaims;
        }
    }
}

export {};
