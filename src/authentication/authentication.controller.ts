import * as bcrypt from 'bcrypt';
import  express from 'express';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../users/user.dto';
import userModel from './../users/user.model';
import LogInDto from './logIn.dto';
 import AuthenticationService from './authentication.service'
class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;
  private service=new AuthenticationService ();
   
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto),this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
  }
 
  private registration = async (request: express.Request, response: express.Response, next:express.NextFunction) => {
    
    const userData: CreateUserDto = request.body;
    try {
    const {
    cookie,
    user,
    } = await this.service.register(userData);
    response.setHeader('Set-Cookie', [cookie]);
    response.send(user);
    } catch (error) {
    next(error);
    }
    
  }
 
  private loggingIn = async (request: express.Request, response: express.Response, next:express.NextFunction) => {
    const logInData: LogInDto = request.body;
    console.log('body',logInData.email)
    
    const user = await this.user.findOne({ email: logInData.email });
    console.log('user.password',user)
    if (user) {
     
      const isPasswordMatching = await bcrypt.compare(logInData.password,user.get('password', null, { getters: false }));
      console.log('isPasswordMatching',isPasswordMatching)
      if (isPasswordMatching) {
        user.password = 'undefined';
        const tokenData = this.service.createToken(user);
        response.setHeader('Set-Cookie', [this.service.createCookie(tokenData)]);
        response.send(user);

      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  }
}
 
export default AuthenticationController;