import { ProductStatus,ProductType } from './../utils/enums';
interface IProduct{
    ProductName:string;
    GroupId:string;
    BrandId:string;
    UrlCode:string;
    AliasProductName:string;
    Reference:string;
    IsActive:boolean;
    Description:string;
    Strengths:[string];
    Weaknesses:[string];
    Colors:[string];
    Weight:number;
    Size:{Width:number;Height:number};
    MetaTitle:string;
    Price:number;
    FinalPrice:number;
    ProfitPercent:number;
    MetaKeyword:string;
    MetaDescription:string;
    Garranty:string;
    ProductVideo:string;
    Images:[string];
    InStock:number;
    OrderQuantityLimit:number;
    Status:ProductStatus;    
    ProductTypeName:ProductType;
}
export default IProduct;