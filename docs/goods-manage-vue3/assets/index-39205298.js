import{E as t}from"./index-1f8c09d0.js";const r=e=>t({url:"/system/department/findDepartmentList",method:"get",params:e}),s=()=>t({url:"/system/department/findAll",method:"get"}),d=()=>t({url:"/system/department/excel",method:"post",responseType:"blob"}),m=e=>t({url:"/system/department/add",method:"post",data:e}),n=e=>t({url:"/system/department/update/"+e.id,method:"put",data:e}),o=e=>t({url:"/system/department/delete/"+e,method:"DELETE"}),l={getList:r,addItem:m,updateItem:n,deleteItem:o,exportTable:d,getListAll:s};export{l as d};
