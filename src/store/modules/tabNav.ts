import { defineStore } from "pinia";
import { constantRoute } from "@/router/routes";
import type { clickedRoute } from '@/types/tabNav.store'

const useTabNavStore = defineStore('tabNavStore', {
    state: () => {
        return {
            clickedRoute: <any>[]  //点击过的路由
        }
    },
    actions: {
        addClickedRoute(item: clickedRoute) {
            //做判断，每次都添加首页的路由，如果没有的话

            judgeHasHome.call(this);

            //每次变化的单个路由，如果已经存在，不要重复添加
            let canAdd = true;
            this.clickedRoute.forEach((inItem: any, index: any) => {
                if (inItem.path == item.path) {
                    canAdd = false
                }
            })
            if (canAdd) {
                //只拿走需要的属性
                this.clickedRoute.push({
                    path: item.path,
                    meta: item.meta
                });
            }
        },

        removeClickedRoute(targetName:string) {
            let deleteIndex=null;
            this.clickedRoute=this.clickedRoute.filter((item:any,index:number)=>{
                if (item.path == targetName) {
                deleteIndex= index
                }
                return item.path!=targetName
            })
            //顺便返回被删除的索引
            return deleteIndex
        }
    },
    getters: {

    }
})

function judgeHasHome() { //这样封装保证了首页的路径和meta信息全部都是读取的

    //@ts-ignore
    let homeRoute = finedHomeRoute()[0].children[0]

    let flag = this.clickedRoute.find((item: any) => {
        return item.path == '/' + homeRoute.path
    })

    if (!flag) {
        this.clickedRoute.push({
            path: '/' + homeRoute.path,
            meta: homeRoute.meta
        });
    }

}

//自定义方法，根据路径找到底层路由对象
function finedHomeRoute() {
    return constantRoute.filter((item, index) => {
        return item.path == '/'
    });

}


export default useTabNavStore;