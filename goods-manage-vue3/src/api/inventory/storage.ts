
import request from '@/utils/request'
import type { ListParams ,listItem ,addStocksForm ,SupplierItem ,addStocksRecordDetail} from "@/types/api/inventory/storage";
import type { pageRes ,operateRes } from "@/types/api/index";



enum Urls{
    reqStockList='/business/inStock/findInStockList',
    delete_item_url = '/business/inStock/delete',
    remove_item_url = '/business/inStock/remove',
    back_item_url = '/business/inStock/back',
    pass_item_url = '/business/inStock/publish',
    add_stocks_url = '/business/inStock/addIntoStock',
    findAll_url = '/business/supplier/findAll',
    record_detail_url = '/business/inStock/detail',
}

export const getList =(params:ListParams)=>{
    return request<pageRes<listItem>>({
        url:Urls.reqStockList,
        method:'get',
        params
    })
}

//删除
export const deleteItem = (id: number) => {
    return request<operateRes>({
        url: Urls.delete_item_url + '/' + id,
        method: 'get',
    })
}

//移入回收站
export const removeItem = (id: number) => {
    return request<operateRes>({
        url: Urls.remove_item_url + '/' + id,
        method: 'put',
    })
}


//恢复
export const backItem = (id: number) => {
    return request<operateRes>({
        url: Urls.back_item_url + '/' + id,
        method: 'put',
    })
    
}
//通过审核
export const passItem = (id: number) => {
    return request<operateRes>({
        url: Urls.pass_item_url + '/' + id,
        method: 'put',
    })
}

//提交入库
export const addStocks =(data:addStocksForm)=>{
    return request<operateRes>({
        url:Urls.add_stocks_url,
        method:'post',
        data
    })
} 

//获取全部已知来源
export const findAll =()=>{
    return request<SupplierItem[]>({
        url:Urls.findAll_url,
        method:'get',
    })
}

//单条详细信息
export const getAddStocksDetail = (id: number,pageNum:number) => {
    return request<addStocksRecordDetail>({
        url: Urls.record_detail_url + '/' + id,
        method: 'get',
        params:{
            pageNum
        }
    })
}

export default { getList,deleteItem,backItem ,removeItem ,passItem,findAll,getAddStocksDetail}



