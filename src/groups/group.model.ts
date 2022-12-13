import * as mongoose from 'mongoose';  
import IGroup from './group.interface';
 
const groupSchema = new mongoose.Schema(
  {  
    GroupName:String,
    GroupImage:String,
    MetaKeyword:String,
    MetaDescription:String,
    Priority:Number,
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
    justOne:true
 })
 
const groupModel = mongoose.model<IGroup & mongoose.Document>('Group', groupSchema);

export default groupModel;