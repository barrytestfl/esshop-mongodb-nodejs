import express from 'express';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import Iproduct from './product.interface';
import productModel from './product.model';
import productDTO from './product.dto';

class productsController implements Controller {
public path = '/products';
public router = express.Router();
private product = productModel;

constructor() {
this.initializeRoutes();
}

private initializeRoutes() {
    
    
    this.router.use('/', authMiddleware);
    
this.router.get(this.path,this.getAllproducts);
this.router.get(`${this.path}/:id`, this.getproductById);
this.router.patch(`${this.path}/:id`,validationMiddleware(productDTO, true), this.modifyproduct);
this.router.delete(`${this.path}/:id`, this.deletePost);
this.router.post(this.path, validationMiddleware(productDTO),this.createproduct);
}

private getAllproducts = (request: express.Request, response: express.Response) => {
this.product.find().populate('productgroups').populate('productbrands').populate('attributes')
.then((products) => {
    response.send(products);
});
}

private getproductById = (request: express.Request, response: express.Response, next:express.NextFunction) => {
const id = request.params.id;
this.product.findById(id)
            .then((product) => {
                        response.send(product);
            }).catch((err)=>{
                console.log(err)
                next(new PostNotFoundException(id))
            });
}
private modifyproduct = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const productData: Iproduct = request.body;
    this.product.findByIdAndUpdate(id, productData, { new: true })
    .then((product) => {
    response.send(product);
    });
    }
    
    private createproduct = (request: express.Request, response: express.Response) => {
    const productData: Iproduct = request.body;
    console.log('createdproduct : ')
    //console.log('productData : ',productData)
    //console.log('request.body : ',request.body)
    const createdproduct = new this.product({...productData});
     createdproduct.save()
     .then((savedproduct) => {
     response.send(savedproduct);
     });
    
     
    }
    
    private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.product.findByIdAndDelete(id)
    .then((successResponse) => {
    if (successResponse) {
    response.send(200);
    } else {
    response.send(404);
    }
    });
    }
    }
    
    export default productsController;