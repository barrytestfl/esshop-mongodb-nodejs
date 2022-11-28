import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import  express from 'express';
import  mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
            this.app = express();

            this.connectToTheDatabase().then(_=>console.log('connected')).catch(err => console.log(err));
            this.initializeMiddlewares();
            this.initializeControllers(controllers);
            this.initializeErrorHandling();

    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeMiddlewares() {
            this.app.use(bodyParser.json());
            this.app.use(cookieParser());
    }
    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
        
    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private  async  connectToTheDatabase() {
        const {MONGO_USER,MONGO_PASSWORD,MONGO_PATH,DATABASENAME} = process.env;
        console.log({MONGO_USER,MONGO_PASSWORD,MONGO_PATH,DATABASENAME})
        await mongoose.connect('mongodb://0.0.0.0:27017/eshop').catch(err => console.log(err));
    
    }
}

export default App;