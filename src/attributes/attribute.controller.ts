import express from 'express';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import IAttribute from './attribute.interface'
import AttributeDTO from './attribute.dto';
import attributeModel from './attribute.model';

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
this.router.patch(`${this.path}/:id`,validationMiddleware(AttributeDTO, true), this.modifyattribute);
this.router.delete(`${this.path}/:id`, this.deletePost);
this.router.post(this.path, validationMiddleware(AttributeDTO),this.createattribute);
}

private getAllattributes = (request: express.Request, response: express.Response) => {
this.attribute.find().populate('groups')
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
    const attributeData: IAttribute = request.body;
    this.attribute.findByIdAndUpdate(id, attributeData, { new: true })
    .then((attribute) => {
    response.send(attribute);
    });
    }
    
    private createattribute = (request: express.Request, response: express.Response) => {
    const attributeData: IAttribute = request.body;
    console.log('attributeData : ',{attributeData})
    console.log('attributeData : ',attributeData)
    const createdattribute = new this.attribute({...attributeData});
    console.log('res : ',{...createdattribute})
    createdattribute.save()
    .then((savedattribute) => {
            response.send(savedattribute);
    }).catch(err=>console.log('error: ',err)); 
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