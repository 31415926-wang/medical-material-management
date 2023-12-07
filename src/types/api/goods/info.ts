
import type { searchParam } from '../index'


//查询参数
export interface infoSearchParam extends searchParam{
    name?:number,
    categoryId?:number,
    supplier?:string,
    status?:number
}


//信息的单体结构
export class infoItem {
    // !赋值断言，表明我们不会让其为空
    categoryKeys!: null | number;
    createTime!: string;
    id!:  number;
    imageUrl!: string;
    model!: string;
    modifiedTime!: string;
    name!: string;
    oneCategoryId!: number;
    pnum!: string;
    remark!: string;
    sort!: number;
    status!: number;
    threeCategoryId!:  number;
    twoCategoryId!:  number;
    unit!: string;
   
    constructor(){
        
    }
}




// {
//     "categoryKeys":  null,
//     "createTime":  "2020-03-18",
//     "id":  17,
//     "imageUrl":  "group1/M00/00/00/rBofMl5yGl2AR3rCAAArOxrzeKs522.jpg",
//     "model":  "10个/包",
//     "modifiedTime":  "2020-08-19",
//     "name":  "N95口罩",
//     "oneCategoryId":  33,
//     "pnum":  "3DFC8EA0-6",
//     "remark":  "救命的口罩",
//     "sort":  1,
//     "status":  0,
//     "threeCategoryId":  37,
//     "twoCategoryId":  34,
//     "unit":  "包"
//  }
 





