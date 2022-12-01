//import { IsString } from 'class-validator';
import { DataTransferObject, IsString, Length, MinLength } from 'data-transfer-object';

class CreatePostDto {
  @IsString()
  public author!: string;
 
  @IsString()  
  public content!: string;
 
  @IsString()
  public title: string='';
    
}
 
export default CreatePostDto;