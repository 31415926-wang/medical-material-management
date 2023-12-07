import type { responseBody } from '../index.js'


export interface treeItem {
    children?: treeItem[],
    disabled: boolean,
    icon: string,
    id: number,
    menuName: string,
    open: number,
    orderNum: number,
    parentId: number,
    perms: null | string,
    type: number,
    url: string
}

export interface getMenuTreeResponse extends responseBody {
    data: {
        open: number[],
        tree: treeItem[]
    }
}

export interface operateResponse extends responseBody {
    data: {
        children?: [],
        icon: string,
        id: number,
        menuName: string
    } |null
}




