
/* 相当于数据字典 */

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

