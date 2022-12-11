import express from 'express';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import IattributeDetailes from './attributesDetails.interface';
import attributeDetailesModel from './attributesDetails.model';
import attributeDetailesDTO from './attributeDetails.dto';

class attributeDetailessController implements Controller {
public path = '/attributeDetailes';
public router = express.Router();
private attributeDetailes = attributeDetailesModel;

constructor() {
this.initializeRoutes();
}

private initializeRoutes() {
    
    
    this.router.use('/', authMiddleware);
    
this.router.get(this.path,this.getAllattributeDetailess);
this.router.get(`${this.path}/:id`, this.getattributeDetailesById);
this.router.patch(`${this.path}/:id`,validationMiddleware(attributeDetailesDTO, true), this.modifyattributeDetailes);
this.router.delete(`${this.path}/:id`, this.deletePost);
this.router.post(this.path, validationMiddleware(attributeDetailesDTO),this.createattributeDetailes);
}

private getAllattributeDetailess = (request: express.Request, response: express.Response) => {
this.attributeDetailes.find()
.then((attributeDetailess) => {
    response.send(attributeDetailess);
});
}

private getattributeDetailesById = (request: express.Request, response: express.Response, next:express.NextFunction) => {
const id = request.params.id;
this.attributeDetailes.findById(id)
            .then((attributeDetailes) => {
                        response.send(attributeDetailes);
            }).catch((err)=>{
                console.log(err)
                next(new PostNotFoundException(id))
            });
}
private modifyattributeDetailes = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const attributeDetailesData: IattributeDetailes = request.body;
    this.attributeDetailes.findByIdAndUpdate(id, attributeDetailesData, { new: true })
    .then((attributeDetailes) => {
    response.send(attributeDetailes);
    });
    }
    
    private createattributeDetailes = (request: express.Request, response: express.Response) => {
    const attributeDetailesData: IattributeDetailes = request.body;
    const createdattributeDetailes = new this.attributeDetailes(attributeDetailesData);
    createdattributeDetailes.save()
    .then((savedattributeDetailes) => {
    response.send(savedattributeDetailes);
    });
    }
    
    private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.attributeDetailes.findByIdAndDelete(id)
    .then((successResponse) => {
    if (successResponse) {
    response.send(200);
    } else {
    response.send(404);
    }
    });
    }
    }
    
    export default attributeDetailessController;