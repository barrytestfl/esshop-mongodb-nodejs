import { IsString } from 'class-validator';
 
class CreatePostDto {
  @IsString()
  public author: string;
 
  @IsString()
  public content: string;
 
  @IsString()
  public title: string;
   constructor(){
    this.author="";
    this.content="";
    this.title="";
   }
}
 
export default CreatePostDto;