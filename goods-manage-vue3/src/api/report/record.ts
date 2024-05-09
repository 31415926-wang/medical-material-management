 
 import request from '@/utils/request'
 import type { RecordForm , RecordItem } from "@/types/api/report/record";
 import type { searchParam ,pageRes  }  from "@/types/api/index";

  enum Urls{
     isReport='/business/health/isReport',
     reqReport='/business/health/report',
     reCordList='/business/health/history'
  }
 
  
  //是否打卡
 export const isReport =()=>{
     return request({
         url:Urls.isReport,
         method:'get'
     })
 }
 
  //填写打卡 
  export const reqReport =(data:RecordForm)=>{
     return request<{}>({
         url:Urls.reqReport,
         method:'post',
         data
     })
 }
 

 //签到记录
 export const reCordList=(params:searchParam)=>{
        return request<pageRes<RecordItem>>({
            url:Urls.reCordList,
            method:'get',
            params
        })
 }






 