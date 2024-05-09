//菜单管理接口
import request from '@/utils/request'
import type { getMenuTreeResponse,operateResponse,treeItem} from "@/types/api/authority/menu"

enum Urls {
    list_url = '/system/menu/tree',
    add_url = '/system/menu/add',
    update_url = '/system/menu/update',
    delete_url = '/system/menu/delete',
    export_url = '/system/menu/excel',
}


export const getMenuTree = () => {
    return request<any,getMenuTreeResponse>({
        url:Urls.list_url,
        method:'get'
    })
}

export const addMenuItem = (data:treeItem) => {
    return request<any,operateResponse>({
        url:Urls.add_url,
        method:'post',
        data
    })
} 



//编辑
export const updateItem = (data:treeItem) => {
    return request<any, operateResponse>({
        url: Urls.update_url+'/'+data.id,
        method: 'put',
        data
    })
}


//删除
export const deleteItem = (id:number) => {
    return request<any, operateResponse>({
        url: Urls.delete_url+'/'+id,
        method: 'DELETE',
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


export default {
    getMenuTree,
    addMenuItem,
    deleteItem,
    updateItem,
    exportTable
}

