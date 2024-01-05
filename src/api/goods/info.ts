//物资资料接口
import request from '@/utils/request'
import { infoSearchParam,infoItem,itemCategory,goodsAddItem } from '@/types/api/goods/info'
import { pageRes,operateRes } from '@/types/api/index'

enum Urls {
    list_url = '/business/product/findProductList',
    add_url = '/business/product/add',
    remove_url = '/business/product/remove',
    category_tree_url = '/business/productCategory/categoryTree',
    get_goods_item_url = '/business/product/edit',
    update_item_url = '/business/product/update',
}


//查询列表
export const getList = (params:infoSearchParam) => {
    return request<pageRes<infoItem>>({   //这里自动限制的是拦截器那边返回的对象.Data的结构
        url: Urls.list_url,
        method: 'get',
        params
    })
}

//添加单个
export const addItem = (data:goodsAddItem) => {
    return request<operateRes>({
        url: Urls.add_url,
        method: 'post',
        data
    })
}


//移入回收站
export const deleteItem = (id:number) => {
    return request<operateRes>({
        url: Urls.remove_url+'/'+id,
        method: 'put',
    })
}


//获得分类树
export const getCategoryTree = () => {
    return request<pageRes<itemCategory>>({
        url: Urls.category_tree_url,
        method: 'get',
    })
}


//编辑，获取单个商品信息
export const getGoodsItem = (id:number) => {
    return request<infoItem>({
        url: Urls.get_goods_item_url+'/'+id,
        method: 'get',
    })
}

//更新单个
export const updateItem = (data:infoItem) => {
    return request<operateRes>({
        url: Urls.update_item_url+'/'+data.id,
        method: 'put',
        data
    })
}



export default {
    getList,
    deleteItem,
    getCategoryTree,
    addItem,
    getGoodsItem,
    updateItem
}





