
/* 角色管理接口 */

import request from '@/utils/request'
import type {roleList, authInfoResponse,roleSearchParam,roleListItem,roleAddOrUpateItem,roleOperateResponse}  from "@/types/api/role"

enum Urls {
    list_url = '/system/role/findRoleList',
    add_url = '/system/role/add',
    update_url = '/system/role/update',
    delete_url = '/system/role/delete',
    export_url = '/system/role/excel',
    isBan_url = '/system/role/updateStatus',
    authInfo_url = '/system/role/findRoleMenu',
    setAuth_url = '/system/role/authority'
}


//列表/查询
export const getList = (params: roleSearchParam) => {
    return request<any, roleList>({
        url: Urls.list_url,
        method: 'get',
        params
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
export const addItem = (data:roleAddOrUpateItem) => {
    return request<any, roleOperateResponse>({
        url: Urls.add_url,
        method: 'post',
        data
    })
}

//改
export const updateItem = (data:roleAddOrUpateItem) => {
    return request<any, roleOperateResponse>({
        url: Urls.update_url+'/'+data.id,
        method: 'put',
        data
    })
}

//删除
export const deleteItem = (id:number) => {
    return request<any, roleOperateResponse>({
        url: Urls.delete_url+'/'+id,
        method: 'DELETE',
    })
}

//是否禁用按钮
export const isBan = (id:number,isBan:boolean) => {
    return request<any, roleOperateResponse>({
        url: Urls.isBan_url+'/'+id+'/'+isBan,
        method: 'put',
    })
}

//获取已分配权限及列表
export const getAuthInfo = (id:number) => {
    return request<any, authInfoResponse>({
        url: Urls.authInfo_url+'/'+id,
        method: 'get',
    })
}

//提交分配权限
export const setAuthInfo = (id:number,data:[]) => {
    return request<any, authInfoResponse>({
        url: Urls.setAuth_url+'/'+id,
        method: 'post',
        data
    })
}




export default {
    getList,
    addItem,
    updateItem,
    deleteItem,
    exportTable,
    isBan,
    getAuthInfo,
    setAuthInfo
}
