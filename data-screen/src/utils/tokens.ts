//使用pinia持久化存储后就不用再用这个
//永久存储在浏览器，只有当后端接口告诉前端过期时，再清除
export const set_tokens=(str:string)=>{
    sessionStorage.setItem('User',str)
}
export const get_tokens=()=>{
    // @ts-ignore
    // return sessionStorage.getItem('User') 
    return JSON.parse(sessionStorage.getItem('User')).token  //按照主应用存在仓库的格式去拿
}
export const remove_tokens=()=>{
    sessionStorage.removeItem('User')
}