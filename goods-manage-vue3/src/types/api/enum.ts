

export enum AddSocksType {
    //捐赠
    donation=1,
    //下拨
    borrow,
    //采购
    Allocation,
    //借用
    purchase
}

export enum  StoragesStatus {
    //已入库/发放
    complete,
    //回收站
    recycle, 
    //待审核
    Pending, 
}

export enum ProvideSocksType {
 //政府领取  
    government,
    //医院领取
    hospital,
    //小区领取
    Community,
    //个人领取
    personal,
    //其他领取
    other
}

export enum ProvidePriority {
    //不急
    priority1=1,
    //常规
    priority2,
    //紧急
    priority3,
    //特急
    priority4,
    //超急
    priority5,
}