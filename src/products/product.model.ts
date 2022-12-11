import * as mongoose from 'mongoose';
import IProduct from './product.interface';
import { ProductStatus,ProductType } from './../utils/enums';
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
    Strengths:[String],
    Weaknesses:[String],
    Colors:[String],
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
    Images:[{ type: mongoose.Types.ObjectId, ref: 'Productimage' }],
    InStock:Number,
    OrderQuantityLimit:Number,
    Status:ProductStatus,    
    ProductTypeName:ProductType,
  }
  ,{ toJSON: { virtuals: true } } /* toJSON option is set because virtual fields are not included in toJSON output by default. So, if you don't set this option, and call User.find().populate('productimages'), you won't get anything in images */
);
productSchema.virtual('productimages',{
    ref: 'Product',
    localField: '_id',
    foreignField: 'Images', 
   
 }); 
 productSchema.virtual('productbrands',{
    ref: 'Product',
    localField: '_id',
    foreignField: 'BrandId', 
   
 }); 
 productSchema.virtual('productgroups',{
    ref: 'Product',
    localField: '_id',
    foreignField: 'GroupId', 
   
 }); 
 
const productModel = mongoose.model<IProduct & mongoose.Document>('Product', productSchema);

export default productModel;