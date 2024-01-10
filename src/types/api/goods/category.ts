

import type { searchParam } from '../index'

export interface listSearchParam extends searchParam {

}

export interface itemList {
    createTime: string,
    id: number,
    lev: number,
    modifiedTime: string,
    name: string,
    pid: number,
    remark: string,
    sort: number,
    children: itemList[] | null
}









