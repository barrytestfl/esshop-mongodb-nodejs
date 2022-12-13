import * as mongoose from 'mongoose';
import IAttribute from './attribute.interface';
import { ProductAttributeType } from './../utils/enums';
 
const attributeSchema = new mongoose.Schema(
  { 
    Name: String,
    Priority: Number,
    Description: String,
    AttributeType:String,
    GroupId:{ type: mongoose.Types.ObjectId, ref: 'Group' },
  } ,
  {
    toJSON: {
      virtuals: true,
      
    },
  },
);
attributeSchema.virtual('groups',{
  ref: 'Group',
  localField: 'GroupId',
  foreignField: '_id', 
  
})
 

 
const attributeModel = mongoose.model<IAttribute & mongoose.Document>('Attribute', attributeSchema);

export default attributeModel;