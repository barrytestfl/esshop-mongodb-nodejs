import express from 'express';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import IBrand from './brand.interface';
import brandModel from './brand.model';
import BrandDTO from './brand.dto';

class BrandsController implements Controller {
public path = '/brands';
public router = express.Router();
private brand = brandModel;

constructor() {
this.initializeRoutes();
}

private initializeRoutes() {
    
    
    this.router.use('/', authMiddleware);
    
this.router.get(this.path,this.getAllBrands);
this.router.get(`${this.path}/:id`, this.getBrandById);
this.router.patch(`${this.path}/:id`,validationMiddleware(BrandDTO, true), this.modifyBrand);
this.router.delete(`${this.path}/:id`, this.deletePost);
this.router.post(this.path, validationMiddleware(BrandDTO),this.createBrand);
}

private getAllBrands = (request: express.Request, response: express.Response) => {
this.brand.find()
.then((brands) => {
    response.send(brands);
});
}

private getBrandById = (request: express.Request, response: express.Response, next:express.NextFunction) => {
const id = request.params.id;
this.brand.findById(id)
            .then((brand) => {
                        response.send(brand);
            }).catch((err)=>{
                console.log(err)
                next(new PostNotFoundException(id))
            });
}
private modifyBrand = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const brandData: IBrand = request.body;
    this.brand.findByIdAndUpdate(id, brandData, { new: true })
    .then((brand) => {
    response.send(brand);
    });
    }
    
    private createBrand = (request: express.Request, response: express.Response) => {
    const brandData: IBrand = request.body;
    const createdBrand = new this.brand(brandData);
    createdBrand.save()
    .then((savedBrand) => {
    response.send(savedBrand);
    });
    }
    
    private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.brand.findByIdAndDelete(id)
    .then((successResponse) => {
    if (successResponse) {
    response.send(200);
    } else {
    response.send(404);
    }
    });
    }
    }
    
    export default BrandsController;