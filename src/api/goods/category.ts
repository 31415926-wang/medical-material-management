

//物资类别接口
import request from '@/utils/request'
import { pageRes, operateRes } from '@/types/api'
import { listSearchParam, itemList } from '@/types/api/goods/source'

enum Urls {
    list_url = '/business/productCategory/categoryTree',
    add_url = '/business/supplier/add',
    update_url = '/business/supplier/update',
    delete_item_url = '/business/supplier/delete',
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
/* 
http://www.localhost:8989/business/productCategory/add
post 
name: "111"
pid: 33
remark: "111"
sort: 1
*/






export default { getList }






