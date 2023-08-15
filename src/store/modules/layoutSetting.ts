import { defineStore } from "pinia";

const useLayoutSettingStore =defineStore('layoutSettingStore',{
    state:()=>{
        return {
            fold: false, //控制菜单折叠还是收起控制
            refresh:false//控制二级组件刷新
        }
    },
    actions:{
    changeFold() {//取反的操作也不止在一个地方做
        this.fold=!this.fold
    },
    changeRefresh(){
        this.refresh=!this.refresh
    }
    },
    getters:{

    }
})

export default useLayoutSettingStore;