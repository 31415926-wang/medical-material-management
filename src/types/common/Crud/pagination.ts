

export interface crudInfo {
    option: {
        title: string,
        pagination: {
            page: number,
            size: number,
        },
        searchParam:{
            [key: string]: any
        },
        apiMethod: {
            getList: null | Function,
            addItem: null | Function,
            updateItem: null | Function,
            deleteItem: null | Function
        },
        resultData: resultData
    }
}


export interface resultData {
    rows: [],
    total: number
}