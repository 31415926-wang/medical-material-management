
/* 用户管理接口 */

import request from '@/utils/request'
// import type { authInfoResponse,userSearchParam,userListItem,userAddOrUpateItem,userOperateResponse}  from "@/types/api/user"
import type { userList, userSearchParam ,userAddOrUpateItem ,userOperateResponse,userRolesCaseResponse}  from "@/types/api/userManage"

enum Urls {
    list_url = '/system/user/findUserList',
    add_url = '/system/user/add',
    update_url = '/system/user/update',
    delete_url = '/system/user/delete',
    export_url = '/system/user/excel',
    isBan_url = '/system/user/updateStatus',
}


//列表/查询
export const getList = (params: userSearchParam) => {
    return request<any, userList>({
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
export const addItem = (data:userAddOrUpateItem) => {
    return request<any, userOperateResponse>({
        url: Urls.add_url,
        method: 'post',
        data
    })
}

//改
export const updateItem = (data:userAddOrUpateItem) => {
    return request<any, userOperateResponse>({
        url: Urls.update_url+'/'+data.id,
        method: 'put',
        data
    })
}

//删除
export const deleteItem = (id:number) => {
    return request<any, userOperateResponse>({
        url: Urls.delete_url+'/'+id,
        method: 'DELETE',
    })
}

//是否禁用按钮
export const isBan = (id:number,isBan:boolean) => {
    return request<any, userOperateResponse>({
        url: Urls.isBan_url+'/'+id+'/'+isBan,
        method: 'put',
    })
}
 

//获取用户的分配角色情况
export const getUserRolesCase =(id:number)=>{
    return request<any, userRolesCaseResponse>({
        url:`/system/user/${id}/roles`,
        method:'get'
    })
}


//分配用户角色
export const assignRoles =(id:number,data:number[])=>{
    return request<any, userOperateResponse>({
        url:`/system/user/${id}/assignRoles`,
        method:'post',
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
    getUserRolesCase,
    assignRoles
}
