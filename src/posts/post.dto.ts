import { IsString } from 'class-validator';
 
class CreatePostDto {
  @IsString()
  public author: string;
 
  @IsString()
  public content: string;
 
  @IsString()
  public title: string;
  constructor (author: string,content: string,title: string){
      this.author=author;
      this.title=title;
      this.content=content;
  }
}
 
export default CreatePostDto;