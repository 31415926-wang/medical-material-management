
/* 相当于数据字典 */
import { AddSocksType ,StoragesStatus,ProvideSocksType ,ProvidePriority } from "@/types/api/enum";


//性别
export const SEX_OPTIONS = [
    {
        value:0,
        label:'女'
    },
    {
        value:1,
        label:'男'
    }
]

//菜单节点类型
export const MENUTYPE_OPTIONS = [
    {
        value:0,
        label:'菜单'
    },
    {
        value:1,
        label:'按钮'
    }
]

//物资状态
export const GOODSTATUS_OPTIONS = [
    {
        value:0,
        label:'正常'
    },
    {
        value:1,
        label:'回收站'
    },
    {
        value:2,
        label:'待审核'
    }
]


//入库的类型
export const AddStoragesTypeOption = [
    {
        value:AddSocksType.donation,
        label:'捐赠'
    },
    {
        value:AddSocksType.borrow,
        label:'下拨'
    },
    {
        value:AddSocksType.Allocation,
        label:'采购'
    },
    {
        value:AddSocksType.purchase,
        label:'借用'
    }
]
 
//入库记录的状态
export const AddStoragesStatusOption = [
    {
        value:StoragesStatus.complete,
        label:'已入库'
    },
    {
        value:StoragesStatus.recycle,
        label:'回收站'
    },
    {
        value:StoragesStatus.Pending,
        label:'待审核'
    }
]

//发放记录的状态
export const ProvideStatusOption = [
    {
        value:StoragesStatus.complete,
        label:'已发放'
    },
    {
        value:StoragesStatus.recycle,
        label:'回收站'
    },
    {
        value:StoragesStatus.Pending,
        label:'待审核'
    }
]

//发放类型
export const ProvideTypeOption = [
    {
        value:ProvideSocksType.government,
        label:'政府领取'
    },
    {
        value:ProvideSocksType.hospital,
        label:'医院领取'
    },
    {
        value:ProvideSocksType.Community,
        label:'小区领取'
    },
    {
        value:ProvideSocksType.personal,
        label:'个人领取'
    },
    {
        value:ProvideSocksType.other,
        label:'其他领取'
    },
]

//发放的紧急程度
export const ProvidePriorityOption=[
    {
        value:ProvidePriority.priority1,
        label:'不急'
    },
    {
        value:ProvidePriority.priority2,
        label:'常规'
    },
    {
        value:ProvidePriority.priority3,
        label:'紧急'
    },
    {
        value:ProvidePriority.priority4,
        label:'特急'
    },
    {
        value:ProvidePriority.priority5,
        label:'超急'
    },
]


//根据value寻找label
export function GetLabel(goalValue:any,goalArr:any){
    let label =''
    goalArr.forEach((item:any,index:any) => {
        if (item.value == goalValue) {
            label=item.label;
        }
    });
    return label;
}

