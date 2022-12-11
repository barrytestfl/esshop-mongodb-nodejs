import { IsNumber, IsString } from 'class-validator';
import { ProductAttributeType } from 'utils/enums';
 
class AttributeDTO {
  @IsString()
  public Name: string; 
  @IsNumber()  
  public Priority!: string; 
  @IsString()
  public Description: string='';
  public AttributeType:ProductAttributeType;
  public GroupId:string;    
}
 
export default AttributeDTO;