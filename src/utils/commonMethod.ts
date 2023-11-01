/* 存放公共封装的js方法*/

//重置一个对象的所有属性值，在原对象上修改
export function resetObj(paramObj: any){
    for (var key in paramObj ){
        paramObj[key]=''
    }
}

//过滤掉对象的属性值为''的属性，返回一个新对象
export function filterEmptyProp(paramObj: any) {
    let newObj: any = {};
    for (var key in paramObj) {
        if (paramObj[key] != '' && paramObj[key] != null) {
            newObj[key] = paramObj[key];
        }
    }

    return newObj
}

export default {
    filterEmptyProp
}