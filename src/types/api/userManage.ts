


import type { responseBody, searchParam } from './index.ts'


export interface userSearchParam extends searchParam {
    [key: string]: any
}

export interface userList extends responseBody {
    data: {
        total: number,
        rows: userListItem[]
    }
}

//获取单个用户分配权限情况
interface role {
    disabled:boolean
    key:number
    label:string
}

export interface userRolesCaseResponse extends responseBody {
    data: {
        roles: role[],
        values: number[]
    }
}

export interface userListItem {
    id: number,
    birth: string,
    createTime: string,
    departmentId: number,
    departmentName: string,
    email: string,
    nickname: string,
    password: string,
    phoneNumber: string,
    sex: number,
    status: boolean,
    username: string,
    loadingStatus?: boolean
}


//添加 /更新
export interface userAddOrUpateItem {
    id?: number,
    birth: string,
    departmentId: number,
    email: string,
    nickname: string,
    password: string,
    phoneNumber: string,
    sex: number,
    username: string,
}

export interface userOperateResponse extends responseBody {
    data: null
}






