import type { responseBody } from './index.ts'


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


export class addOrUpdateTreeItem {
    disabled: boolean,
    icon: string,
    id?: number,
    menuName: string,
    open: number,
    orderNum: number,
    parentId: number,
    perms: null | string,
    type: number,
    url: string
    constructor(parameters) {
        
    }
}
// 节点名称
// URL
// 权限编码
// 图标
// *是否可用
// *是否展开
// *排序
// *类型
//（隐藏的parentId）


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




