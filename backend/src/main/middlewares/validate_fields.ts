import { Request, Response } from "express";
import { validationResult } from "express-validator";
import SimpleResponse from "../objects/simple-response";

const validateInputs = ( req: Request, res:Response, next: () => void ) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json(new SimpleResponse(true,'error mw',errores) );
    }
    next();
}

export {
  validateInputs
};