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
        
        if (paramObj[key] !== '' && paramObj[key] !== null) { //不全等会有0==null
            newObj[key] = paramObj[key];
        }
    }

    return newObj
}

//拿到后端的blod对象，转换成url并访问下载。
export const handleExportFile=(blodFile:Blob,title:string)=>{
    // 将二进制文件转化为可访问的url
    let blodUrl=window.URL.createObjectURL(blodFile);
    let aDOM=document.createElement('a');
    document.body.appendChild(aDOM);
    aDOM.href=blodUrl;
    aDOM.download=title+'信息'
    aDOM.click();
    document.body.removeChild(aDOM);
}



//获取当前时间段的状态
export const getTimeState = () => {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let text = ``;
    // 判断当前时间段
    if (hours >= 0 && hours <= 10) {
        text = `早上`;
    } else if (hours > 10 && hours <= 14) {
        text = `中午`;
    } else if (hours > 14 && hours <= 18) {
        text = `下午`;
    } else if (hours > 18 && hours <= 24) {
        text = `晚上`;
    }
    // 返回当前时间段对应的状态
    return text;
};



//处理elment-ui图标，转换为element-plush的命名
export const handleIcon = (iconStr: string) => {
    if (iconStr) {
        let resultIconArr = iconStr.split('');
        //找出需要大写的索引
        let indexsToUP = [0]
        resultIconArr.forEach((item, index) => {
            if (item == '-') {
                indexsToUP.push(index + 1)
            }
        })
        indexsToUP.forEach((item, index) => {
            resultIconArr[item] = resultIconArr[item].toUpperCase();
        })

        let resultStr = resultIconArr.join(',').replaceAll(',', '')
        resultStr = resultStr.replaceAll('El-Icon-', '')

        if (resultStr.indexOf('-') == -1) {
            return resultStr;
        }else{//否则去除最长的那个
            return resultStr.split('-')[0].length > resultStr.split('-')[1].length ?  resultStr.split('-')[0] : resultStr.split('-')[1]
        }


    }

}

export default {
    filterEmptyProp,
    resetObj,
    getTimeState,
    handleExportFile,
    handleIcon
}