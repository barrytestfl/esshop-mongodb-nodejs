import {  IsString } from 'class-validator'; 
 
class BrandDTO {
  @IsString()
    public BrandName:string;
  @IsString()    
    public BrandImage:string;
  @IsString()    
    public BoxImage:string;
  @IsString()    
    public Discription:string;  
}
 
export default BrandDTO;