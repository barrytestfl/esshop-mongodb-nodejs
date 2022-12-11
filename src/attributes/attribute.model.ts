import * as mongoose from 'mongoose';
import IAttribute from './attribute.interface';
import { ProductAttributeType } from './../utils/enums';
 
const attributeSchema = new mongoose.Schema(
  { 
    Name: String,
    Priority: String,
    Description: String,
    AttributeType:ProductAttributeType,
    GroupId:{ type: mongoose.Types.ObjectId, ref: 'Group' },
  } 
);

 

 
const attributeModel = mongoose.model<IAttribute & mongoose.Document>('Attribute', attributeSchema);

export default attributeModel;