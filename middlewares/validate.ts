import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import AppError from "../errors/AppError.js";

type RequestProp = "body" | "query" | "params";

const validate = (schema: ZodType, searchProp: RequestProp, destProp: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parseResult = schema.safeParse(req[searchProp]);

        if(parseResult.success){
            // destProp es dinámico, así que TypeScript no sabe qué propiedad de req se escribe.
            Object.assign(req, { [destProp]: parseResult.data });
            return next();
        }

        const details = parseResult.error.issues.map(i => ({campo: i.path[0], mensaje: i.message}))

        next(new AppError("VALIDACION", "Datos inválidos", 400, details));
    }
}

function validateBody(schema: ZodType){
    return validate(schema, "body", "body");
}

function validateQuery(schema: ZodType, propName: string){
    return validate(schema, "query", propName);
}

export { validateBody, validateQuery }
