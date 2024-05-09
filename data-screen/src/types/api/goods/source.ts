import type { searchParam } from '../index'

export interface listSearchParam extends searchParam {
    name?: string,
    address?: number,
    contact?: number
}

export interface itemList {
    address: string,
    contact: string,
    createTime: string,
    email: string,
    id: number,
    modifiedTime: string,
    name: string,
    phone: number,
    sort: number,
    address1: string,
    address2: string,
    address3: string
}


export interface addOrUpdateItem {
    address: string,
    contact: string,
    email: string,
    name: string,
    phone: string,
    sort: number,
    id?:number
}


export interface cityItem {
    name: string,
    value: string,
    parent?: string
}


