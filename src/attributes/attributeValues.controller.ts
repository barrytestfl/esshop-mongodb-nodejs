import express from 'express';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import IattributeValues from './attributeValues.interface';
import attributeValuesModel from './attributeValues.model';
import attributeValuesDTO from './attributeValues.dto';

class attributeValuessController implements Controller {
public path = '/attributeValues';
public router = express.Router();
private attributeValues = attributeValuesModel;

constructor() {
this.initializeRoutes();
}

private initializeRoutes() {
    
    
    this.router.use('/', authMiddleware);
    
this.router.get(this.path,this.getAllattributeValuess);
this.router.get(`${this.path}/:id`, this.getattributeValuesById);
this.router.patch(`${this.path}/:id`,validationMiddleware(attributeValuesDTO, true), this.modifyattributeValues);
this.router.delete(`${this.path}/:id`, this.deletePost);
this.router.post(this.path, validationMiddleware(attributeValuesDTO),this.createattributeValues);
}

private getAllattributeValuess = (request: express.Request, response: express.Response) => {
this.attributeValues.find()
.then((attributeValuess) => {
    response.send(attributeValuess);
});
}

private getattributeValuesById = (request: express.Request, response: express.Response, next:express.NextFunction) => {
const id = request.params.id;
this.attributeValues.findById(id)
            .then((attributeValues) => {
                        response.send(attributeValues);
            }).catch((err)=>{
                console.log(err)
                next(new PostNotFoundException(id))
            });
}
private modifyattributeValues = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const attributeValuesData: IattributeValues = request.body;
    this.attributeValues.findByIdAndUpdate(id, attributeValuesData, { new: true })
    .then((attributeValues) => {
    response.send(attributeValues);
    });
    }
    
    private createattributeValues = (request: express.Request, response: express.Response) => {
    const attributeValuesData: IattributeValues = request.body;
    const createdattributeValues = new this.attributeValues(attributeValuesData);
    createdattributeValues.save()
    .then((savedattributeValues) => {
    response.send(savedattributeValues);
    });
    }
    
    private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.attributeValues.findByIdAndDelete(id)
    .then((successResponse) => {
    if (successResponse) {
    response.send(200);
    } else {
    response.send(404);
    }
    });
    }
    }
    
    export default attributeValuessController;