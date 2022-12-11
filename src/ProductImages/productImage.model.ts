import * as mongoose from 'mongoose';  
import IProductImage from './productImage.interface';
 
const productImageSchema = new mongoose.Schema(
  {  
    ProductId:{ type: mongoose.Types.ObjectId, ref: 'Product' },
    Image:String,
    Prority:Number,
 } 
  ,
  {
    toJSON: {
      virtuals: true,
      
    },
  },
);
 
 
const productImageModel = mongoose.model<IProductImage & mongoose.Document>('Productimage', productImageSchema);

export default productImageModel;