import{E as e}from"./index-14e5c0a4.js";const r=t=>e({url:"/business/product/findProductList",method:"get",params:t}),o=t=>e({url:"/business/product/add",method:"post",data:t}),s=t=>e({url:"/business/product/remove/"+t,method:"put"}),u=()=>e({url:"/business/productCategory/categoryTree",method:"get"}),d=t=>e({url:"/business/product/edit/"+t,method:"get"}),n=t=>e({url:"/business/product/update/"+t.id,method:"put",data:t}),c=t=>e({url:"/business/product/findProductStocks",method:"get",params:t}),p={getList:r,deleteItem:s,getCategoryTree:u,addItem:o,getGoodsItem:d,updateItem:n,findProductStocks:c};export{c as f,p as i};
