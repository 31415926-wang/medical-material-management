
import type { searchParam } from '../index'


//查询参数
export interface infoSearchParam extends searchParam{
    name?:number,
    categoryId?:number,
    supplier?:string,
    status?:number
}


//列表信息的单体结构 / 编辑获取的单个信息， !赋值断言，表明我们不会让其为空
export class infoItem {
    
    categoryKeys!: null | number | number[];
    createTime!: string; 
    id!:  number;
    imageUrl!: string;
    model!: string;
    modifiedTime!: string;
    name!: string;
    oneCategoryId!: undefined | number;
    pnum!: string;
    remark!: string;
    sort!: number;
    status!: number;
    threeCategoryId!:  undefined | number;
    twoCategoryId!:  undefined | number;
    unit!: string;
    constructor(){
        
    }
}

//添加的单体
export interface goodsAddItem{
    categoryKeys:[],
    id?:  number,
    imageUrl: string,
    model: string,
    name: string,
    remark: string,
    sort: number,
    unit: string
}


export interface itemCategory
{
    createTime: string;
    id: number;
    lev: number;
    modifiedTime: string;
    name: string;
    pid: number;
    remark: string;
    sort: number;
    children:itemCategory[]
}





