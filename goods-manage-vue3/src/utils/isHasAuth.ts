
import useUserStore from '@/store/modules/user'
 
//全局函数，判断是否有权限

const isHasAuth=(authKeys:string[]):boolean=>{
    //通过权限关键词，判断用户仓库信息里面，是否有权限信息
    const useStore=useUserStore();

    // console.log("实验",useStore.userInfo.perms);
    let result = authKeys.every((item)=>{
       return (new Set(useStore.userInfo.perms)).has(item)
    })


    return result
}

export default isHasAuth;





