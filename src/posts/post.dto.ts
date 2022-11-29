import { IsString } from 'class-validator';
 
class CreatePostDto {
  @IsString()
  public author: string;
 
  @IsString()
  public content: string;
 
  @IsString()
  public title: string;

  constructor(private _Dto:CreatePostDto ) { 
    // Initialization inside the constructor
    this.author =_Dto.author;
    this.title =_Dto.title;
    this.content =_Dto.content;
 }
}
 
export default CreatePostDto;