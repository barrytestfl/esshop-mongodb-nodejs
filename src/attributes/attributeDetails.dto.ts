import {  IsString } from 'class-validator'; 
 
class AttributeDetailsDTO {
  @IsString()
  public ProductId: string; 
  @IsString()
  public AttributeId: string; 
  @IsString()
  public AttributeValueId: string; 
  @IsString()
  public Value: string; 
}
 
export default AttributeDetailsDTO;