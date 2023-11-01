import type { responseBody,searchParam} from './index.ts'


//列表\查询
export interface depSearchParam  extends searchParam{
    name?:string,
    [key: string]: any
}

export interface depList extends responseBody{
    data:{
        total: number,
        rows:depListItem[]
    }
}

export interface depListItem{
    id: number,
    name: string,
    phone: number,
    address: string,
    createTime: string,
    modifiedTime: string,
    total: number
}


//添加
export interface depAddOrUpateItem{
    address: string,
    name : string,
    phone: number
}

export interface depOperateResponse extends responseBody{
    data:null
}



