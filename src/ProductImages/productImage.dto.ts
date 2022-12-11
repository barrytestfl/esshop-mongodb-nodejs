import {  IsNumber, IsString } from 'class-validator'; 
 
class ProductImageDTO {
  @IsString()
  public ProductId:string;
  @IsString()
  public Image:string;
  @IsNumber()
  public Prority?:number;
}
 
export default ProductImageDTO;