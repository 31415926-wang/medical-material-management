interface rowItem{
    id:number,
    [key: string]: any
}

export interface crudInfo {
        title: string,
        pagination: {
            page: number,
            size: number,
        },
        searchParam:{
            [key: string]: any
        },
        selectedItems:rowItem[],
        apiMethod: {
            getList: null | Function,
            addItem: null | Function,
            updateItem: null | Function,
            deleteItem: null | Function,
            exportTable?:null | Function
            batchDelete?:null | Function
            getDetailById?:null | Function
        },
        resultData: resultData,
        getDataAfterFn:any
}


export interface resultData {
    rows: [],
    total: number
}

//表格列初始化时的结构
export interface tableCol {
    prop:string,
    label:string,
    width?:number,
    sortable?:boolean,
    searchType?:string
    show?:boolean,
    rebuild?:boolean
}




