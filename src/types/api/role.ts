

import type { responseBody, searchParam } from './index.ts'


export interface roleSearchParam extends searchParam {
    [key: string]: any
}

export interface roleList extends responseBody {
    data: {
        total: number,
        rows: roleListItem[]
    }
}

export interface roleListItem {
    id: number,
    createTime: string,
    modifiedTime: string,
    remark: string,
    roleName: string,
    status: boolean,
    loadingStatus?: boolean
}


//添加
export interface roleAddOrUpateItem {
    id?: number,
    remark: string,
    roleName: string,
}

export interface roleOperateResponse extends responseBody {
    data: null
}


export interface treeItemInfo {
    id: number,
    menuName: string,
    open: number,
    icon: string,
    disabled: boolean,
    orderNum: number,
    perms: null,
    type: number
    url: string,
    parentId: number,
    children?: treeItemInfo[],
}

export interface authInfoResponse {
    data: {
        mids: number[],
        open: number[],
        tree: []
    },
    success: boolean
}




