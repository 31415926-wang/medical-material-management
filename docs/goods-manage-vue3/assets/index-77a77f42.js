import{i as K}from"./initCrud-08564742.js";import{E as c,d as P,r as s,b as v,k as W,l as t,m as l,u,p as J,F as Q,v as n,e as A,z as x,g as N,H as B,f as X,I as Y,D as Z,t as $,M as E,G as F}from"./index-f29751aa.js";const ee=a=>c({url:"/system/role/findRoleList",method:"get",params:a}),te=()=>c({url:"/system/role/excel",method:"post",responseType:"blob"}),le=a=>c({url:"/system/role/add",method:"post",data:a}),ae=a=>c({url:"/system/role/update/"+a.id,method:"put",data:a}),oe=a=>c({url:"/system/role/delete/"+a,method:"DELETE"}),re=(a,i)=>c({url:"/system/role/updateStatus/"+a+"/"+i,method:"put"}),de=a=>c({url:"/system/role/findRoleMenu/"+a,method:"get"}),ne=(a,i)=>c({url:"/system/role/authority/"+a,method:"post",data:i}),g={getList:ee,addItem:le,updateItem:ae,deleteItem:oe,exportTable:te,isBan:re,getAuthInfo:de,setAuthInfo:ne},se={class:"custom-scrollbar dialog-container"},ue={class:"custom-tree-node"},pe=P({__name:"index",setup(a){let i=s(),S=s(),T=s(),L=v([{prop:"roleName",label:"角色名",searchType:"input"},{prop:"createTime",label:"创建时间"},{prop:"status",label:"是否禁用",rebuild:!0,width:160},{prop:"remark",label:"备注"}]);K(T,{title:"角色",apiMethod:g},L,o=>{o.rows.forEach(d=>{d.loadingStatus=!1})});const U=v({roleName:[{required:!0,message:"请输入角色名称",trigger:"blur"}],remark:[{required:!0,message:"请输入描述信息",trigger:"blur"},{min:3,max:10,message:"最小长度3-10",trigger:"blur"}]}),R=o=>(o.loadingStatus=!0,new Promise((d,C)=>{g.isBan(o.id,!o.status).then(()=>{o.loadingStatus=!1,d(!0),E("success","修改状态成功")}).catch(()=>{o.loadingStatus=!1,C(!0)})}));let m=s(!1),h=s(!1),D=s();const M={children:"children",label:"menuName",disabled:"disabled"};let k=s([]),b=s([]);const p=v({data:[],id:0}),I=async o=>{m.value=!0,F.openLoading(document.getElementById("tree"));try{let d=(await g.getAuthInfo(o.id)).data;console.log("权限初始数据",d),p.data=d.tree,p.id=o.id,k.value=d.open,b.value=d.mids,F.closeLoading()}catch{F.closeLoading()}},y=()=>{m.value=!1,p.id=0,p.data=[],k.value=[],b.value=[]},O=async()=>{console.log("选中的节点"),h.value=!0;let o=D.value.getCheckedKeys();g.setAuthInfo(p.id,o).then(()=>{h.value=!1,y(),E("success","分配权限成功")}).catch(()=>{h.value=!1})};return(o,d)=>{const C=n("el-switch"),_=n("el-input"),f=n("el-form-item"),w=n("el-form"),V=n("el-button"),q=n("el-tooltip"),H=n("CrudTable"),j=n("el-icon"),z=n("el-tree"),G=n("el-dialog");return A(),W(Q,null,[t(H,{ref_key:"CrudTableRef",ref:T,needOperate:!0,operateColWidth:260,addCheckForm:u(i),editorCheckForm:u(S)},{statusCol:l(({scope:e})=>[t(C,{modelValue:e.row.status,"onUpdate:modelValue":r=>e.row.status=r,loading:e.row.loadingStatus,"before-change":()=>R(e.row)},null,8,["modelValue","onUpdate:modelValue","loading","before-change"])]),addForm:l(({formInfo:e})=>[t(w,{ref_key:"addCheckForm",ref:i,inline:!1,model:e,"label-width":"80px",rules:U},{default:l(()=>[t(f,{label:"角色名称",prop:"roleName"},{default:l(()=>[t(_,{modelValue:e.roleName,"onUpdate:modelValue":r=>e.roleName=r,placeholder:"请输入角色名称"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(f,{label:"描述信息",prop:"remark"},{default:l(()=>[t(_,{modelValue:e.remark,"onUpdate:modelValue":r=>e.remark=r,placeholder:"请输入描述信息"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["model","rules"])]),editorForm:l(({formInfo:e})=>[t(w,{ref_key:"editorCheckForm",ref:S,inline:!1,model:e,"label-width":"80px",rules:U},{default:l(()=>[t(f,{label:"角色名称",prop:"roleName"},{default:l(()=>[t(_,{modelValue:e.roleName,"onUpdate:modelValue":r=>e.roleName=r,placeholder:"请输入角色名称"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(f,{label:"描述信息",prop:"remark"},{default:l(()=>[t(_,{modelValue:e.remark,"onUpdate:modelValue":r=>e.remark=r,placeholder:"请输入描述信息"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["model","rules"])]),operateExpand:l(({rowInfo:e})=>[t(q,{content:"角色授权",placement:"top",effect:"dark"},{default:l(()=>[t(V,{icon:"Setting",onClick:r=>I(e)},null,8,["onClick"])]),_:2},1024)]),_:1},8,["addCheckForm","editorCheckForm"]),t(G,{modelValue:u(m),"onUpdate:modelValue":d[0]||(d[0]=e=>J(m)?m.value=e:m=e),title:"角色权限分配","before-close":y},{footer:l(()=>[t(V,{icon:"CloseBold",onClick:y},{default:l(()=>[x(" 关闭 ")]),_:1}),t(V,{type:"primary",icon:"Setting",loading:u(h),onClick:O},{default:l(()=>[x("授权")]),_:1},8,["loading"])]),default:l(()=>[N("div",se,[t(z,{ref_key:"tree",ref:D,id:"tree",data:p.data,"show-checkbox":"","node-key":"id","default-expanded-keys":u(k),"default-checked-keys":u(b),props:M},{default:l(({node:e,data:r})=>[N("span",ue,[N("span",null,[t(j,{style:{"margin-right":"7px"}},{default:l(()=>[u(B)(r.icon)!=""?(A(),X(Y(u(B)(r.icon)),{key:0})):Z("",!0)]),_:2},1024),x($(e.label),1)])])]),_:1},8,["data","default-expanded-keys","default-checked-keys"])])]),_:1},8,["modelValue"])],64)}}});export{pe as default};
