import type { TokenClaims } from "./services.js";

// Agrega a Request la propiedad `auth` que completa el middleware adminAuth.
declare global {
    namespace Express {
        interface Request {
            auth?: TokenClaims;
        }
    }
}

export {};
