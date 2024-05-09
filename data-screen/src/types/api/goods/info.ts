
import type { searchParam } from '../index'


//查询参数
export interface infoSearchParam extends searchParam{
    name?:number,
    categoryId?:number,
    supplier?:string,
    status?:number
}


//列表信息的单体结构 / 编辑获取的单个信息， !赋值断言，表明我们不会让其为空
export interface infoItem {
    categoryKeys: null | number | number[];
    createTime: string; 
    id:  number;
    imageUrl: string;
    model: string;
    modifiedTime: string;
    name: string;
    oneCategoryId?: number;
    pnum: string;
    remark: string;
    sort: number;
    status: number;
    threeCategoryId?:  number;
    twoCategoryId?:  number;
    unit: string;
  
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
 

//获取库存列表的单体
export interface productStocksInfoItem{
    id: number
    imageUrl: string
    model: string
    name: string
    pnum: string
    remark: null
    stock: number
    unit: string
}





