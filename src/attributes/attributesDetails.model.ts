import * as mongoose from 'mongoose';  
import IAttributesDetails from './attributesDetails.interface';
 
const attributesDetailsSchema = new mongoose.Schema(
  { 
    ProductId: { type: mongoose.Types.ObjectId, ref: 'Product' },
    AttributeId:  { type: mongoose.Types.ObjectId, ref: 'Attribute' },
    AttributeValueId:  { type: mongoose.Types.ObjectId, ref: 'AttributeValues' }, 
    Value:String
  } 
);

 

 
const attributesDetailsModel = mongoose.model<IAttributesDetails & mongoose.Document>('AttributesDetails', attributesDetailsSchema);

export default attributesDetailsModel;