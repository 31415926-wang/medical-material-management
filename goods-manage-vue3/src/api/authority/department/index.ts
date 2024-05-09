import request from '@/utils/request'
import type { depListAll,depSearchParam, depList, depAddOrUpateItem,depOperateResponse } from '@/types/api/authority/department'
enum Urls {
    list_url = '/system/department/findDepartmentList',
    add_url = '/system/department/add',
    update_url = '/system/department/update',
    delete_url = '/system/department/delete',
    export_url = '/system/department/excel',
    listAll_url = '/system/department/findAll',
}
 
//列表/查询
export const getList = (params: depSearchParam) => {
    return request<any, depList>({
        url: Urls.list_url,
        method: 'get',
        params
    })
}
export const getListAll = () => {
    return request<any, depListAll>({
        url: Urls.listAll_url,
        method: 'get',
    })
}

//导出表格
export const exportTable= () => {
    return request<any, any>({
        url: Urls.export_url,
        method: 'post',
        responseType: "blob"
    })
}

//增
export const addItem = (data:depAddOrUpateItem) => {
    return request<any, depOperateResponse>({
        url: Urls.add_url,
        method: 'post',
        data
    })
}

//改
export const updateItem = (data:depAddOrUpateItem) => {
    return request<any, depOperateResponse>({
        url: Urls.update_url+'/'+data.id,
        method: 'put',
        data
    })
}

//删除
export const deleteItem = (id:number) => {
    return request<any, depOperateResponse>({
        url: Urls.delete_url+'/'+id,
        method: 'DELETE',
    })
}

//上面的单独暴露可以省略，保留则可以整个对象引入，也可以解构引入
export default {
    getList,
    addItem,
    updateItem,
    deleteItem,
    exportTable,
    getListAll
}


