import * as mongoose from 'mongoose';  
import IGroup from './group.interface';
 
const groupSchema = new mongoose.Schema(
  {  
    GroupName:String,
    GroupImage:String,
    MetaKeyword:String,
    MetaDescription:String,
    Priority:String,
    Parent:{ type: mongoose.Types.ObjectId, ref: 'Group' }
  } 
  ,
  {
    toJSON: {
      virtuals: true,
      
    },
  },
);
groupSchema.virtual('childs',{
    ref: 'Group',
    localField: '_id',
    foreignField: 'Parent', 
    
 })
 
const groupModel = mongoose.model<IGroup & mongoose.Document>('Group', groupSchema);

export default groupModel;