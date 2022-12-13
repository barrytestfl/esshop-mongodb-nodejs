import * as mongoose from 'mongoose';  
import IAttributesDetails from './attributesDetails.interface';
 
const attributesDetailsSchema = new mongoose.Schema(
  { 
    ProductId: { type: mongoose.Types.ObjectId, ref: 'Product' },
    AttributeId:  { type: mongoose.Types.ObjectId, ref: 'Attribute' },
    AttributeValueId:  { type: mongoose.Types.ObjectId, ref: 'AttributeValues' }, 
    Value:String
  } 
  ,{ toJSON: { virtuals: true } }
);

attributesDetailsSchema.virtual('products',{
  ref: 'Product',
  localField: 'ProductId',
  foreignField: '_id', 
 justOne:true
}); 
attributesDetailsSchema.virtual('Attributes',{
  ref: 'Attribute',
  localField: 'AttributeId',
  foreignField: '_id', 
  justOne:true
});
attributesDetailsSchema.virtual('Values',{
  ref: 'AttributeValues',
  localField: 'AttributeValueId',
  foreignField: '_id', 
  justOne:true
});
const attributesDetailsModel = mongoose.model<IAttributesDetails & mongoose.Document>('AttributesDetails', attributesDetailsSchema);

export default attributesDetailsModel;