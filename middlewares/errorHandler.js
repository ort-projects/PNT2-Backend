import AppError from "../errors/AppError.js";

function errorHandler(err, req, res, next){
    if(err instanceof AppError)
        res.status(err.statusCode).json({ 
            error: { 
                code: err.code, 
                message: err.message, 
                ...(err.details != null && { details: err.details })
            } 
        })
    else{
        console.error(err);
        res.status(500).json({ 
            error: { 
                code: "ERROR_INTERNO", 
                message: "Ocurrió un error inesperado"
            } 
        })
    }
}

export default errorHandler;