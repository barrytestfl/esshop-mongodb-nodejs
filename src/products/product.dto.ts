import {  IS_BOOLEAN, IsNumber, IsString, IsBoolean, IsArray, isArray } from 'class-validator'; 
import { ProductStatus,ProductType } from './../utils/enums'; 
class ProductDTO {
    constructor(){

    }
    @IsString()
    public ProductName:string;
    @IsString()
    public GroupId:string;
    @IsString()
    public BrandId:string;
    @IsString()
    public UrlCode:string;
    @IsString()
    public AliasProductName:string;
    @IsString()
    public Reference:string;
    @IsBoolean()
    public IsActive:boolean;
    @IsString()
    public Description:string;
    //@IsArray()
    public Strengths?:[string];
    //@IsArray()
    public Weaknesses?:[string];
    //@IsArray()
    public Colors?:[string];
    @IsNumber()
    public Weight:number;
    
    public Size?:{Width:number;Height:number};
    @IsString()
    public MetaTitle:string;
    @IsNumber()
    public Price:number;
    @IsNumber()
    public FinalPrice:number=0;
    @IsNumber()
    public ProfitPercent:number=0;
    @IsString()
    public MetaKeyword:string;
    @IsString()
    public MetaDescription:string;
    @IsString()
    public Garranty:string;
    @IsString()
    public ProductVideo:string;
    
    public Images?:[string];
    @IsNumber()
    public InStock:number=0;
    @IsString()
    public OrderQuantityLimit:number=1;
    @IsString()
    public Status:string;    
    @IsString()
    public ProductTypeName:string;
}
 
export default ProductDTO;