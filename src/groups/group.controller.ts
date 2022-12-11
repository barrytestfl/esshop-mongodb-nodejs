import express from 'express';
import Controller from '../interfaces/controller.interface';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import Igroup from './group.interface';
import groupModel from './group.model';
import groupDTO from './group.dto';

class groupsController implements Controller {
public path = '/groups';
public router = express.Router();
private group = groupModel;

constructor() {
this.initializeRoutes();
}

private initializeRoutes() {
    
    
    this.router.use('/', authMiddleware);
    
this.router.get(this.path,this.getAllgroups);
this.router.get(`${this.path}/:id`, this.getgroupById);
this.router.patch(`${this.path}/:id`,validationMiddleware(groupDTO, true), this.modifygroup);
this.router.delete(`${this.path}/:id`, this.deletePost);
this.router.post(this.path, validationMiddleware(groupDTO),this.creategroup);
}

private getAllgroups = (request: express.Request, response: express.Response) => {
this.group.find()
.then((groups) => {
    response.send(groups);
});
}

private getgroupById = (request: express.Request, response: express.Response, next:express.NextFunction) => {
const id = request.params.id;
this.group.findById(id)
            .then((group) => {
                        response.send(group);
            }).catch((err)=>{
                console.log(err)
                next(new PostNotFoundException(id))
            });
}
private modifygroup = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const groupData: Igroup = request.body;
    this.group.findByIdAndUpdate(id, groupData, { new: true })
    .then((group) => {
    response.send(group);
    });
    }
    
    private creategroup = (request: express.Request, response: express.Response) => {
    const groupData: Igroup = request.body;
    const createdgroup = new this.group(groupData);
    createdgroup.save()
    .then((savedgroup) => {
    response.send(savedgroup);
    });
    }
    
    private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.group.findByIdAndDelete(id)
    .then((successResponse) => {
    if (successResponse) {
    response.send(200);
    } else {
    response.send(404);
    }
    });
    }
    }
    
    export default groupsController;