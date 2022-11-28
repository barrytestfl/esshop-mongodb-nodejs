import * as bodyParser from 'body-parser';
import  express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
            this.app = express();

            this.connectToTheDatabase();
            this.initializeMiddlewares();
            this.initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeMiddlewares() {
            this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private   connectToTheDatabase() {
        const {MONGO_USER,MONGO_PASSWORD,MONGO_PATH,DATABASENAME} = process.env;
        console.log({MONGO_USER,MONGO_PASSWORD,MONGO_PATH,DATABASENAME})
       // mongoose.connect(`mongodb://${MONGO_PATH}/${DATABASENAME}`);
        try{
      //await mongoose.connect(MONGO_PATH as string, {     dbName:DATABASENAME      });
      mongoose.connect(`mongodb://${MONGO_PATH}/${DATABASENAME}`);
      console.log('connected to mongodb')
    }
    catch(e){
        console.log('error     ---',e)
    }
    }
}

export default App;