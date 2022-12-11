import { ProductAttributeType } from './../utils/enums';
interface IAttribute{
    Name:string;
    Priority?:number;
    Description:string;
    AttributeType:ProductAttributeType;
    GroupId:string
}
export  default IAttribute;