import { plainToClass, plainToClassFromExist, plainToInstance  } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { sanitize, Trim } from "class-sanitizer";
import * as express from 'express';
import HttpException from '../exceptions/HttpException';
 
function validationMiddleware(type: any, skipMissingProperties = false):
express.RequestHandler {
  return (req:express.Request, res:express.Response, next:express.NextFunction) => {
    
    console.log('type',type)
    console.log('body',req.body)
    const dtoObj=plainToClassFromExist(type, req.body );
    console.log('dtoObj',dtoObj)
    validate(dtoObj, { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) =>
          Object.values(error.constraints||[])).join(', ');
          next(new HttpException(400, message));
        } else {
          
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      });
  };
}
export default validationMiddleware;