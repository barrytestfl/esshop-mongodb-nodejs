import {  IsString } from 'class-validator'; 
 
class AttributeValuesDTO {
  @IsString()
  public AttributeId: string; 
  @IsString()
  public Value: string; 
}
 
export default AttributeValuesDTO;