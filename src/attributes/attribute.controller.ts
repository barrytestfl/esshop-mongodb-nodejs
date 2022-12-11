import express from 'express';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import Iattribute from './attribute.interface';
import attributeModel from './attribute.model';
import attributeDTO from './attribute.dto';

class attributesController implements Controller {
public path = '/attributes';
public router = express.Router();
private attribute = attributeModel;

constructor() {
this.initializeRoutes();
}

private initializeRoutes() {
    
    
    this.router.use('/', authMiddleware);
    
this.router.get(this.path,this.getAllattributes);
this.router.get(`${this.path}/:id`, this.getattributeById);
this.router.patch(`${this.path}/:id`,validationMiddleware(attributeDTO, true), this.modifyattribute);
this.router.delete(`${this.path}/:id`, this.deletePost);
this.router.post(this.path, validationMiddleware(attributeDTO),this.createattribute);
}

private getAllattributes = (request: express.Request, response: express.Response) => {
this.attribute.find()
.then((attributes) => {
    response.send(attributes);
});
}

private getattributeById = (request: express.Request, response: express.Response, next:express.NextFunction) => {
const id = request.params.id;
this.attribute.findById(id)
            .then((attribute) => {
                        response.send(attribute);
            }).catch((err)=>{
                console.log(err)
                next(new PostNotFoundException(id))
            });
}
private modifyattribute = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const attributeData: Iattribute = request.body;
    this.attribute.findByIdAndUpdate(id, attributeData, { new: true })
    .then((attribute) => {
    response.send(attribute);
    });
    }
    
    private createattribute = (request: express.Request, response: express.Response) => {
    const attributeData: Iattribute = request.body;
    const createdattribute = new this.attribute(attributeData);
    createdattribute.save()
    .then((savedattribute) => {
    response.send(savedattribute);
    });
    }
    
    private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.attribute.findByIdAndDelete(id)
    .then((successResponse) => {
    if (successResponse) {
    response.send(200);
    } else {
    response.send(404);
    }
    });
    }
    }
    
    export default attributesController;