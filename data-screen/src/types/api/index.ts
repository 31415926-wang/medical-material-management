//定义所有接口返回都有的结构

export interface responseBody {
    success: boolean,
}

//从物资管理开始都是用下面的
export interface searchParam {
    pageNum: number,
    pageSize:number
}

//分页返回的结构
export interface pageRes<T>{
   /*  data:{
        rows:T[],
        total:number
    }
    success:boolean */
    rows:T[],
    total:number
} 
 
//操作返回的结构
export interface operateRes{
    data:null,
    success:boolean
}
