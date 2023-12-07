//物资资料接口
import request from '@/utils/request'
import { infoSearchParam,infoItem } from '@/types/api/goods/info'
import { pageRes,operateRes } from '@/types/api/index'

enum Urls {
    list_url = '/business/product/findProductList',
    remove_url = '/business/product/remove',
}


//查询列表
export const getList = (params:infoSearchParam) => {
    return request<pageRes<infoItem>>({
        url: Urls.list_url,
        method: 'get',
        params
    })
}


//移入回收站
export const deleteItem = (id:number) => {
    return request<operateRes>({
        url: Urls.remove_url+'/'+id,
        method: 'put',
    })
}


//添加单个
// http://www.localhost:8989/product/add
//post
// categoryKeys: [33, 34, 37]
// model: "2个/包"
// name: "测试物资1"
// remark: "测试物资备注1"
// sort: 2
// unit: "包"


// 编辑获取单个
//business/product/edit/17
// data:{
// categoryKeys:null
// createTime:"2020-03-18"
// id:17
// imageUrl:"group1/M00/00/00/rBofMl5yGl2AR3rCAAArOxrzeKs522.jpg"
// model:"10个/包"
// modifiedTime:"2020-08-19"
// name:"N95口罩"
// oneCategoryId:33
// pnum:"3DFC8EA0-6"
// remark:"救命的口罩"
// sort:1
// status:0
// threeCategoryId:37
// twoCategoryId:34
// unit:"包"
// }
// success:true


//更新单个
// /business/product/update/17
// put
// categoryKeys:[33, 34, 37]
// createTime:"2020-03-18"
// id:17
// imageUrl:"group1/M00/00/00/rBofMl5yGl2AR3rCAAArOxrzeKs522.jpg"
// model:"10个/包"
// modifiedTime:"2020-08-19"
// name:"N95口罩1"
// oneCategoryId:33
// pnum:"3DFC8EA0-6"
// remark:"救命的口罩"
// sort:2
// status:0
// threeCategoryId:37
// twoCategoryId:34
// unit:"包"


//上传图片
// /system/upload/image
//post


//获得分类树
//business/productCategory/categoryTree
//get



export default {
    getList,
    deleteItem
}





