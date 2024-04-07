

import type { pageRes, operateRes, searchParam } from "@/types/api/index";
import { AddSocksType, StoragesStatus } from "@/types/api/enum";
import type { infoItem } from "@/types/api/goods/info";

export type ListParams = searchParam & Partial<{
    status: StoragesStatus
    type: AddSocksType
    inNum: number
    startTime: string
    endTime: string
}>


// 列表的每一项
export type listItem = {
    address: null
    contact: null
    createTime: string
    email: null
    endTime: null
    id: number
    inNum: string
    modified: string
    name: null
    operator: string
    phone: string
    productNumber: number
    products: []
    remark: string
    sort: null
    startTime: null
    status: StoragesStatus
    supplierId: number
    supplierName: string
    type: AddSocksType
}



//入库表单结构 
export type addStocksForm = {
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
    //邮箱
    email: ?string
    //具体来源
    name?: string
    //联系号码
    phone?: string

    //入库类型
    type?: AddSocksType
    // 已知来源的ID
    supplierId?: number
    //备注
    remark: string
    //排序
    sort: number
    //物资数组
    products: productItem[]

}


export type productItem = {
    productId: number
    productNumber: number
} & Partial<infoItem>
// 合并物资资料的属性



export type SupplierItem = {
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

export type addStocksRecordDetail = {
    inNum: number
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
    supplierVO: {
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


