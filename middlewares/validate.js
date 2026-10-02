import AppError from "../errors/AppError.js";

const validate = (schema, searchProp, destProp) => {
    return (req, res, next) => {
        const parseResult = schema.safeParse(req[searchProp]);

        if(parseResult.success){
            req[destProp] = parseResult.data;
            return next();
        }

        const details = parseResult.error.issues.map(i => ({campo: i.path[0], mensaje: i.message}))

        next(new AppError("VALIDACION", "Datos inválidos", 400, details));
    }
}

function validateBody(schema){
    return validate(schema, "body", "body");
}

function validateQuery(schema, propName){
    return validate(schema, "query", propName);
}

export { validateBody, validateQuery }
