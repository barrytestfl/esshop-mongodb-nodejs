import {  IsNumber, IsString } from 'class-validator'; 
 
class GroupDTO {
  @IsString()
  public GroupName:string;
  @IsString()
  public GroupImage:string;
  @IsString()
  public MetaKeyword:string;
  @IsString()
  public MetaDescription:string;
  @IsNumber()
  public Priority?:number;
  @IsString()
  public Parent?:string 
}
 
export default GroupDTO;