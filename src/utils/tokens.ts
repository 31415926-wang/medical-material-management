//永久存储在浏览器，只有当后端接口告诉前端过期时，再清除
export const set_tokens=(str:string)=>{
    localStorage.setItem('TOKEN',str)
}
export const get_tokens=()=>{
    return localStorage.getItem('TOKEN')
}
export const remove_tokens=()=>{
    localStorage.removeItem('TOKEN')
}