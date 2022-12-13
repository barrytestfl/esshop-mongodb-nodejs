import * as mongoose from 'mongoose';
import IProduct from './product.interface';
const ArraySchema = new mongoose.Schema({
   Items: {
     type: String,
     required: false,
   },
   Prority:{type:Number, required: false,} 
 });
const productSchema = new mongoose.Schema(
  {  
    ProductName:String,
    GroupId:{ type: mongoose.Types.ObjectId, ref: 'Group' },
    BrandId:{ type: mongoose.Types.ObjectId, ref: 'Brand' },
    UrlCode:String,
    AliasProductName:String,
    Reference:String,
    IsActive:Boolean,
    Description:String,
    Strengths:{
      type:[String],
      required: false
   },
    Weaknesses:{
      type:[String],
      required: false
   },
    Colors:{
      type:[String],
      required: false
   },
    Weight:Number,
    Size:{Width:Number,Height:Number},
    MetaTitle:String,
    Price:Number,
    FinalPrice:Number,
    ProfitPercent:Number,
    MetaKeyword:String,
    MetaDescription:String,
    Garranty:String,
    ProductVideo:String,
   //  Images:[{ type: mongoose.Types.ObjectId, ref: 'Productimage' }],
   Images:{
      type:[String],
      required: false
   },
    InStock:Number,
    OrderQuantityLimit:Number,
    Status:String,    
    ProductTypeName:String,
  }
  ,{ toJSON: { virtuals: true } } /* toJSON option is set because virtual fields are not included in toJSON output by default. So, if you don't set this option, and call User.find().populate('productimages'), you won't get anything in images */
);
// productSchema.virtual('productimages',{
//     ref: 'Product',
//     localField: '_id',
//     foreignField: 'Images', 
   
//  }); 
 productSchema.virtual('productbrands',{
    ref: 'Brand',
    localField: 'BrandId',
    foreignField: '_id', 
   justOne:true
 }); 
 productSchema.virtual('productgroups',{
    ref: 'Group',
    localField: 'GroupId',
    foreignField: '_id', 
    justOne:true
 });
 productSchema.virtual('attributes',{
   ref: 'attributesdetails',
   localField: 'ProductId',
   foreignField: '_id', 
   justOne:true
}); 
 
const productModel = mongoose.model<IProduct & mongoose.Document>('Product', productSchema);

export default productModel;