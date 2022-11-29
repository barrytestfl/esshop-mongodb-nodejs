import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import  express from 'express';
import HttpException from '../exceptions/HttpException';
 
function validationMiddleware(type: any, skipMissingProperties = false):
express.RequestHandler {
  return (req:express.Request, res:express.Response, next:express.NextFunction) => {
    validate(plainToClass(type, req.body as Object), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) =>
          Object.values(error.constraints||[])).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}
export default validationMiddleware;