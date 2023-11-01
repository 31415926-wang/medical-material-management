import { onMounted, ref, reactive, toRefs, computed, nextTick } from 'vue'
import { merge } from "lodash";
import { crudInfo, resultData } from '@/types/common/Crud/pagination'
import loadingObj from '@/utils/elLoading'
import {filterEmptyProp} from '@/utils/commonMethod'

export default function () {


    // 数据：配置信息+接口数据
    let crudInfo = reactive<crudInfo>({
        option: {
            title: '',
            pagination: {
                page: 1,
                size: 10,
            },
            searchParam:{
            },
            apiMethod: {
                getList: null,
                addItem: null,
                updateItem: null,
                deleteItem: null
            },
            resultData: <resultData>{}
        }
    });

    //计算属性需要被页面引用内容才会调
    let tableData = computed(() => {
        return crudInfo.option.resultData?.rows || [];
    })
    let total = computed(() => {
        return crudInfo.option.resultData?.total || 0;
    })
    let page = computed({
        get() {
            return crudInfo.option.pagination.page;
        },
        set(val) {
            crudInfo.option.pagination.page = val;
        }
    })
    let size = computed({
        get() {
            return crudInfo.option.pagination.size;
        },
        set(val) {
            crudInfo.option.pagination.size = val;
        }
    })
    let searchParam = computed({
        get() {
            return crudInfo.option.searchParam;
        },
        set(val) {
            //对象类型的计算属性，这里永远不会被调用
            console.log("设置searchParam",val);
        }
    })



    // 方法：初始化传入的基本配置
    const crudInit = (passOption: object) => {
        //解决多层对象时，相同属性被直接覆盖的情况。引入新的问题，丢失响应式，需给realtive对象多加一层
        crudInfo.option = merge({}, crudInfo.option, passOption)
        nextTick(() => {//里面有获取DOM
            getData();
        })

    }

    const getData = async () => {
        let { apiMethod, pagination,searchParam } = crudInfo.option;
        loadingObj.openLoading(document.querySelector(".tableSection") as HTMLElement);
        //可以在请求前将空的查询参数过滤掉，已防后台报错
        let newSearchParam=filterEmptyProp(searchParam)
        // console.log("过滤空参数",newSearchParam);
        
        try {
            let result = await apiMethod.getList!({
                pageNum: pagination.page,
                pageSize: pagination.size,
                ...newSearchParam
            })
            crudInfo.option.resultData = result.data;
            console.log("请求的分页列表", result.data);
        } catch (error) {

        }
        loadingObj.closeLoading();


    }

    // 返回对象给页面接收后调用
    return {
        crudInfo,
        crudInit,
        tableData,
        total,
        page,
        size,
        getData,
        searchParam
    }
}






