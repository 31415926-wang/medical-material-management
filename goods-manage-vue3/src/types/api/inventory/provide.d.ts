

import type { pageRes, operateRes, searchParam } from "@/types/api/index";
import { AddSocksType, StoragesStatus, ProvideSocksType, ProvidePriority } from "@/types/api/enum";
import type { infoItem } from "@/types/api/goods/info";


export type ListParams = searchParam & Partial<{
    status: StoragesStatus
    outNum: number
    type: ProvideSocksType
}>


// 列表的每一项
export type listItem = {
    address: null
    consumerId: number
    contact: null
    createTime: string
    id: number
    name: string
    operator: string
    outNum: string
    phone: string
    priority: number
    productNumber: number
    products: []
    remark: string
    sort: null
    status: number
    type: number
}



//发放表单结构 
export type ProvideForm = {
    //完整地址
    address?: string
    //省
    province?: string
    //市
    city?: string
    //区
    origin?: string
    valueCity?: string
    valueOrigin?: string
    valueProvince?: string

    //联系人
    contact?: string
    //具体来源
    name?: string
    //联系号码
    phone?: string


    //物资数组
    products: productItem[]
    //排序
    sort: number
    //备注
    remark: string
    //入库类型
    type: ProvideSocksType
    //优先级
    priority: ProvidePriority

    //已知去向
    consumerId?: number

}

export type productItem = {
    productId: number
    productNumber: number
} & Partial<infoItem>
// 合并物资资料的属性


export type ConsumerItem = {
    address: string
    contact: string
    createTime: string
    id: number
    modifiedTime: string
    name: string
    phone: string
    sort: number
}


export type ProvideStocksRecordDetail = {
    outNum: number
    itemVOS: {
        count: number
        id: number
        imageUrl: string
        model: string
        name: string
        pnum: string
        unit: string
    }[]
    operator: string
    status: StoragesStatus
    consumerVO: {
        address: string
        contact: string
        createTime: string
        email: string
        id: number
        modifiedTime: string
        name: string
        phone: string
        sort: number
    }
    total: number
    type: number
}


