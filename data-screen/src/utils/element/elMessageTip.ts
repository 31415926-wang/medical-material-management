import { ElMessage } from 'element-plus'
//该方法不与vue实例直接相关，会单独出现在ts文件，所以不放在vue全局属性与方法里
export default function Tip(type:any,message:any){
    ElMessage({
        type,
        message,
    })
}




