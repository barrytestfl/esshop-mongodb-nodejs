import * as mongoose from 'mongoose';  
import IBrand from './brand.interface';
 
const brandSchema = new mongoose.Schema(
  {  
    BrandName:String,
    BrandImage:String,
    BoxImage:String,
    Discription:String,
  } 
);
 
const brandModel = mongoose.model<IBrand & mongoose.Document>('Brand', brandSchema);

export default brandModel;