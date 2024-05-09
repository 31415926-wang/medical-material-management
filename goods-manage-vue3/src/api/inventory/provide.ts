
import request from '@/utils/request'
import type { ListParams ,listItem ,ProvideForm ,ConsumerItem ,ProvideStocksRecordDetail} from "@/types/api/inventory/provide";
import type { pageRes ,operateRes } from "@/types/api/index";


enum Urls{
    reqStockList='/business/outStock/findOutStockList',
    delete_item_url = '/business/outStock/delete',
    remove_item_url = '/business/outStock/remove',
    back_item_url = '/business/outStock/back',
    pass_item_url = '/business/outStock/publish',
    provide_url = '/business/outStock/addOutStock',
    findAll_url = '/business/consumer/findAll',
    record_detail_url = '/business/outStock/detail',
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

//提交发放
export const provideGood =(data:ProvideForm)=>{
    return request<operateRes>({
        url:Urls.provide_url,
        method:'post',
        data
    })
} 

//获取已知的去向/客户
export const findAll =()=>{
    return request<ConsumerItem[]>({
        url:Urls.findAll_url,
        method:'get',
    })
}

//单条详细信息
export const getProvideStocksDetail = (id: number,pageNum:number) => {
    return request<ProvideStocksRecordDetail>({
        url: Urls.record_detail_url + '/' + id,
        method: 'get',
        params:{
            pageNum
        }
    })
}

export default { getList,deleteItem,backItem ,removeItem ,passItem,findAll,getProvideStocksDetail}



