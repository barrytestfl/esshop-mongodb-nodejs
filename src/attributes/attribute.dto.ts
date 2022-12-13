import { IsNumber, IsString } from 'class-validator';
import { ProductAttributeType } from '../utils/enums';
 
class AttributeDTO {
  @IsString()
  public Name: string; 
  @IsNumber()  
  public Priority!: number; 
  @IsString()
  public Description: string='';
  @IsString()
  public AttributeType:string;
  public GroupId:string;    
}
 
export default AttributeDTO;