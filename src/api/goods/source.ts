//物资来源接口
import request from '@/utils/request'
import { pageRes, operateRes } from '@/types/api'
import { listSearchParam, itemList, addOrUpdateItem,cityItem } from '@/types/api/goods/source'

enum Urls {
    list_url = '/business/supplier/findSupplierList',
    add_url = '/business/supplier/add',
    update_url = '/business/supplier/update',
    datail_item_url = '/business/supplier/edit',
    delete_item_url = '/business/supplier/delete',
    req_citys_url = "/json/provinces.json"
}



//查询列表
export const getList = (params: listSearchParam) => {
    return request<pageRes<itemList>>({
        url: Urls.list_url,
        method: 'get',
        params
    })
}

//获取单行的详细数据
export const getDetailById = (id: number) => {
    return request<any>({
        url: Urls.datail_item_url + '/' + id,
        method: 'get'
    })
}

//新增
export const addItem = (data: addOrUpdateItem) => {
    return request<operateRes>({
        url: Urls.add_url,
        method: 'post',
        data
    })
}

//更新
export const updateItem = (data: addOrUpdateItem) => {
    return request<operateRes>({
        url: Urls.update_url + '/' + data.id,
        method: 'put',
        data
    })
}

//删除
export const deleteItem = (id: number) => {
    return request<operateRes>({
        url: Urls.delete_item_url + '/' + id,
        method: 'DELETE',
    })
}


//获取城市列表
export const getCityList = () => {
    return request<cityItem[]>({
        url:Urls.req_citys_url,
        method:'get'
    })
}




export default { getList, getDetailById,getCityList ,deleteItem,addItem,updateItem}


