import express from 'express';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import IproductImage from './productImage.interface';
import productImageModel from './productImage.model';
import productImageDTO from './productImage.dto';

class productImagesController implements Controller {
public path = '/productImages';
public router = express.Router();
private productImage = productImageModel;

constructor() {
this.initializeRoutes();
}

private initializeRoutes() {
    
    
    this.router.use('/', authMiddleware);
    
this.router.get(this.path,this.getAllproductImages);
this.router.get(`${this.path}/:id`, this.getproductImageById);
this.router.patch(`${this.path}/:id`,validationMiddleware(productImageDTO, true), this.modifyproductImage);
this.router.delete(`${this.path}/:id`, this.deletePost);
this.router.post(this.path, validationMiddleware(productImageDTO),this.createproductImage);
}

private getAllproductImages = (request: express.Request, response: express.Response) => {
this.productImage.find()
.then((productImages) => {
    response.send(productImages);
});
}

private getproductImageById = (request: express.Request, response: express.Response, next:express.NextFunction) => {
const id = request.params.id;
this.productImage.findById(id)
            .then((productImage) => {
                        response.send(productImage);
            }).catch((err)=>{
                console.log(err)
                next(new PostNotFoundException(id))
            });
}
private modifyproductImage = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const productImageData: IproductImage = request.body;
    this.productImage.findByIdAndUpdate(id, productImageData, { new: true })
    .then((productImage) => {
    response.send(productImage);
    });
    }
    
    private createproductImage = (request: express.Request, response: express.Response) => {
    const productImageData: IproductImage = request.body;
    const createdproductImage = new this.productImage({...productImageData});
    createdproductImage.save()
    .then((savedproductImage) => {
    response.send(savedproductImage);
    });
    }
    
    private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.productImage.findByIdAndDelete(id)
    .then((successResponse) => {
    if (successResponse) {
    response.send(200);
    } else {
    response.send(404);
    }
    });
    }
    }
    
    export default productImagesController;