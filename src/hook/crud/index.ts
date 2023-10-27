import { onMounted, reactive, toRefs,computed } from 'vue'
import { merge } from "lodash";
import type {depList} from '@/types/api/department'

export default function () {

  
    // 数据：配置信息+接口数据
    let crudInfo = reactive({
        option:{
            title: '',
            pagination: {
                page: 1,
                size: 10,
            },
            apiMethod: {
                getList: null,
                addItem: null,
                updateItem: null,
                deleteItem: null
            },
            resultData: {}
        }
    });

    //计算属性需要被页面引用内容才会调
    let tableData=computed(()=>{
        return crudInfo.option.resultData?.rows || [];
    })
    let total=computed(()=>{
        return crudInfo.option.resultData?.total|| 0;
    })
    let pageParam=computed({
        get(){
            return{
                
            }
        },
        set(){

        }
    })


    // 方法：初始化传入的基本配置
    const crudInit = (passOption: object) => {
        //解决多层对象时，相同属性被直接覆盖的情况。引入新的问题，丢失响应式，需给realtive对象多加一层
        crudInfo.option = merge({}, crudInfo.option, passOption)
        getData();
        console.log("初始化配置，并请求列表", crudInfo);
    }
 
    const getData=async ()=>{
        let {apiMethod,pagination}=crudInfo.option;
        let result= await apiMethod.getList({
                pageNum: pagination.page,
                pageSize: pagination.size
            }) 
        crudInfo.option.resultData=result.data; 
    
    }

    // 返回对象给页面接收后调用
    return {
        crudInfo,
        crudInit,
        tableData,
        total,
    }
}






