

export type RecordForm = {
    passby: number | null
    reception: number | null
    situation: number | null
    touch: number | null

    address: string
    province: string
    city: string
    origin: string

    valueCity: string
    valueOrigin: string
    valueProvince: string
}


export type RecordItem = {
    address: string
    createTime: string
    id: number
    passby: number
    reception: number
    situation: number
    touch: number
    userId: number
}