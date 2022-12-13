import * as mongoose from 'mongoose';  
import IAttributeValues from './attributeValues.interface';
 
const attributeValuesSchema = new mongoose.Schema(
  {  
    AttributeId:  { type: mongoose.Types.ObjectId, ref: 'Attribute' }, 
    Value:String
  } 
);
const attributeValuesModel = mongoose.model<IAttributeValues & mongoose.Document>('AttributeValues', attributeValuesSchema);

export default attributeValuesModel;