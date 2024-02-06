

//物资类别接口
import request from '@/utils/request'
import { pageRes, operateRes } from '@/types/api'
import { listSearchParam, itemList ,addOrUpdateItem } from '@/types/api/goods/source'

enum Urls {
    list_url = '/business/productCategory/categoryTree',
    add_url = '/business/productCategory/add',
    update_url = '/business/productCategory/update',
    delete_item_url = '/business/productCategory/delete',
}
 

//查询列表
export const getList = (params: listSearchParam) => {
    return request<pageRes<itemList>>({
        url: Urls.list_url,
        method: 'get',
        params
    })
}
 
// 新增
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

export default { getList,addItem ,updateItem ,deleteItem}






