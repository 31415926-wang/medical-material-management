import { onMounted, ref, reactive, toRefs, computed, nextTick } from 'vue'
import { merge } from "lodash";
import { crudInfo, resultData } from '@/types/common/Crud'
import loadingObj from '@/utils/element/elLoading'
import { filterEmptyProp, handleExportFile } from '@/utils'
import Tip from '@/utils/element/elMessageTip'
import Confirm from '@/utils/element/elMessageBox'
import { tableCol } from "@/types/common/Crud/index"
import $bus from '@/bus'

export default function () {


    // 数据：配置信息+接口数据
    let crudInfo = reactive<crudInfo>({
        option: {
            title: '',
            pagination: {
                page: 1,
                size: 10,
            },
            searchParam: {
            },
            apiMethod: {
                getList: null,
                addItem: null,
                updateItem: null,
                deleteItem: null,
                exportTable: null,
                batchDelete: null
            },
            selectedItems: [],
            resultData: <resultData>{},
            getDataAfterFn:null //若需要每次获得表格数据后做再处理
        }
    });
    //存储表格的初始化列信息
    let tableCols = ref([] as tableCol[]);
    let title = computed(() => {
        return crudInfo.option.title;
    })

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
            console.log("设置searchParam", val);
        }
    })

    // 方法：初始化传入的基本配置
    /* 
        参数3：获取表格数据后处理
    */
    const crudInit = (passOption: object, tableColsParam: tableCol[], getDataAfterFn?: Function) => {
        //解决多层对象时，相同属性被直接覆盖的情况。引入新的问题，丢失响应式，需给realtive对象多加一层
        crudInfo.option = merge({}, crudInfo.option, passOption)

        tableCols.value = tableColsParam;
        tableCols.value.forEach((item) => {
            //给每个列对象添加自定义属性，show，用与控制列
            if (item.show == undefined) {
                item.show = true //直接追加属性
            }
            //顺便同步一份查询属性名到crudInfo查询参数,默认值''
            if (item.searchType) {
                crudInfo.option.searchParam[item.prop] = ''
            }
        })

        //确保上面tableCols完整，才能拿给列操作去处理，并且需要响应式
        $bus.emit('initSelectedCol');


        nextTick(() => {//里面有获取DOM
            getData();
            if (getDataAfterFn) {
                crudInfo.option.getDataAfterFn=getDataAfterFn;
            }
        })

    }

    const getData = async () => {
        let { apiMethod, pagination, searchParam } = crudInfo.option;
        loadingObj.openLoading(document.querySelector(".tableSection") as HTMLElement);
        //可以在请求前将空的查询参数过滤掉，以防后台报错
        let newSearchParam = filterEmptyProp(searchParam)
        // console.log("过滤空参数",newSearchParam);

        try {
            let result = await apiMethod.getList!({
                pageNum: pagination.page,
                pageSize: pagination.size,
                ...newSearchParam
            })
            crudInfo.option.resultData = result.data;
            console.log("请求的分页列表", result.data);

            //处理表格格式，若需要追加属性的话
            if ( crudInfo.option.getDataAfterFn) {
                crudInfo.option.getDataAfterFn(crudInfo.option.resultData);
            }

        } catch (error: any) {
            throw new Error("请求分页失败", error);
        }
        loadingObj.closeLoading();
    }

    //根据id获取一个行的详细数据
    const getRowDetail = (id:number) =>{
        return new Promise((resolve,reject)=>{
            crudInfo.option.apiMethod.getDetailById!(id).then((result:any)=>{
                resolve(result.data);
            }).catch((error:any)=>{
                reject(error);
            })
        })
    }



    enum operateType {
        add = 0,
        update = 1
    }

    const addOrUpdate = async (type: number, obj: Object) => { //0增加、1修改
        let { apiMethod } = crudInfo.option;
        try {
            let method = (type == operateType.add) ? 'addItem' : 'updateItem';
            //@ts-ignore
            await apiMethod[method](obj);

            Tip('success', '操作成功');
            getData();
            return true;
        } catch (e) {
            return Promise.reject(e);
        }


    }

    //删除的回调
    const deleteRow = async (id: number, isBatch = false) => {
        let { apiMethod, selectedItems } = crudInfo.option;
        //判断有没有选中项
        if (isBatch) {
            if (selectedItems.length == 0) {
                Tip('warning', '其至少选中一项');
                return;
            }

            Confirm('删除', async () => {
                //调批量的接口
                let ids: Number[] = [];
                selectedItems.forEach((item, index) => {
                    ids.push(item.id);
                })
                await apiMethod.batchDelete!(ids);
                getData();
                Tip('info', '删除成功！')
            }, () => {
            });

        } else {
            await apiMethod.deleteItem!(id)
            Tip('success', '删除成功！');
            getData();

        }
    }




    //处理表格导出
    const handleExportTable = async () => {
        let tableExcelBlod = await crudInfo.option.apiMethod.exportTable!();
        handleExportFile(tableExcelBlod, crudInfo.option.title);
        Tip('success', '导出表格成功!');
    }






    // 返回对象给页面接收后调用
    return {
        crudInfo,
        tableCols,
        crudInit,
        handleExportTable,
        tableData,
        total,
        page,
        size,
        getData,
        searchParam,
        deleteRow,
        addOrUpdate,
        title,
        getRowDetail
    }
}






