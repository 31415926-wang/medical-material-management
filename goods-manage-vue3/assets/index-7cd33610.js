import{i as te}from"./initCrud-b95b78e5.js";import{H as h,d as oe,r as c,b as H,o as de,k as w,l as e,m as l,u as _,p as ue,F as S,N,v as o,e as V,D as M,z as s,t as g,g as b,I as R,f as Y}from"./index-ed8136fe.js";import{d as re}from"./index-08e003f4.js";import{G as se,S as ne}from"./shareData-091bd6ed.js";import{r as pe,a as me}from"./validate-dc4b6a83.js";const ie=u=>h({url:"/system/user/findUserList",method:"get",params:u}),ce=()=>h({url:"/system/user/excel",method:"post",responseType:"blob"}),_e=u=>h({url:"/system/user/add",method:"post",data:u}),ge=u=>h({url:"/system/user/update/"+u.id,method:"put",data:u}),be=u=>h({url:"/system/user/delete/"+u,method:"DELETE"}),he=(u,f)=>h({url:"/system/user/updateStatus/"+u+"/"+f,method:"put"}),Ve=u=>h({url:`/system/user/${u}/roles`,method:"get"}),fe=(u,f)=>h({url:`/system/user/${u}/assignRoles`,method:"post",data:f}),T={getList:ie,addItem:_e,updateItem:ge,deleteItem:be,exportTable:ce,isBan:he,getUserRolesCase:Ve,assignRoles:fe},ye=b("br",null,null,-1),Ue={style:{float:"left"}},ve={style:{float:"right"}},ke={style:{float:"left"}},xe={style:{float:"right"}},Ce={style:{float:"left"}},we={style:{float:"right"}},Se={class:"custom-scrollbar dialog-container"},qe=oe({__name:"index",setup(u){let f=c(),P=c(),A=c(),X=H([{prop:"username",label:"用户名",searchType:"input"},{prop:"nickname",label:"昵称",searchType:"input"},{prop:"sex",label:"性别",rebuild:!0,width:100},{prop:"departmentName",label:"所属部门"},{prop:"birth",label:"生日",sortable:!0},{prop:"email",label:"邮箱",searchType:"input",rebuild:!0},{prop:"phoneNumber",label:"电话"},{prop:"status",label:"是否禁用",rebuild:!0,width:100}]);te(A,{title:"用户",apiMethod:T},X,n=>{n.rows.forEach(p=>{p.loadingStatus=!1})});const O=H({username:[{required:!0,message:"请输入用户名",trigger:"blur"}],departmentId:[{required:!0,message:"请选中所在部门",trigger:"change"}],nickname:[{required:!0,message:"请输入昵称",trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{validator:pe,trigger:"blur"}],phoneNumber:[{required:!0,message:"请输入手机号码",trigger:"blur"},{validator:me,trigger:"blur"}],birth:[{required:!0,message:"请选择出生日期",trigger:"blur"}]});let x=c([]);const J=n=>(n.loadingStatus=!0,new Promise((p,k)=>{T.isBan(n.id,!n.status).then(()=>{n.loadingStatus=!1,p(!0),N("success","修改状态成功")}).catch(()=>{n.loadingStatus=!1,k(!0)})})),G=()=>{re.getListAll().then(n=>{x.value=n.data}).catch(()=>{N("error","获取部门下拉列表失败")})};let y=c(!1),C=c(!1),F=c();const v=c([]),D=c([]),K=n=>{y.value=!0,F.value=n.id,R.openLoading(document.querySelector(".dialog-container")),T.getUserRolesCase(F.value).then(p=>{console.log("获取分配信息情况",p.data),v.value=p.data.values,D.value=p.data.roles,R.closeLoading()}).catch(()=>{R.closeLoading(),N("success","获取分配角色列表失败")})},L=()=>{y.value=!1,v.value=[],D.value=[]},Q=async()=>{C.value=!0,T.assignRoles(F.value,v.value).then(()=>{C.value=!1,L(),N("success","分配角色成功")}).catch(()=>{C.value=!1})};return de(()=>{G()}),(n,p)=>{const k=o("el-text"),B=o("el-option"),q=o("el-select"),d=o("el-form-item"),U=o("el-radio"),z=o("el-radio-group"),W=o("el-tag"),Z=o("el-switch"),E=o("el-button"),I=o("el-tooltip"),m=o("el-input"),r=o("el-col"),i=o("el-row"),$=o("el-date-picker"),j=o("el-form"),ee=o("CrudTable"),le=o("el-transfer"),ae=o("el-dialog");return V(),w(S,null,[e(ee,{ref_key:"CrudTableRef",ref:A,onOpenDialogBefore:G,operateColWidth:260,needOperate:!0,addCheckForm:_(f),editorCheckForm:_(P),dialogWidths:{add:"34%",editor:"34%",detail:"34%"}},{"search-custom":l(({scope:a})=>[ye,e(d,{label:"　部门"},{default:l(()=>[e(q,{modelValue:a.searchParam.departmentId,"onUpdate:modelValue":t=>a.searchParam.departmentId=t,clearable:"",placeholder:"请选择部门"},{default:l(()=>[(V(!0),w(S,null,M(_(x),t=>(V(),Y(B,{key:Number(t.id),label:t.name,value:Number(t.id)},{default:l(()=>[b("span",Ue,g(t.name),1),b("span",ve,[e(k,{type:"primary"},{default:l(()=>[s(g(t.total)+"人",1)]),_:2},1024)])]),_:2},1032,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(d,{label:"性别"},{default:l(()=>[e(z,{modelValue:a.searchParam.sex,"onUpdate:modelValue":t=>a.searchParam.sex=t},{default:l(()=>[e(U,{value:1,size:"large",style:{"padding-bottom":"3px"}},{default:l(()=>[s("男")]),_:1}),e(U,{value:0,size:"large",style:{"padding-bottom":"3px"}},{default:l(()=>[s("女")]),_:1})]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),sexCol:l(({scope:a})=>[e(W,{type:a.row.sex===0?"danger":"primary"},{default:l(()=>[s(g(_(se)(a.row.sex,_(ne))),1)]),_:2},1032,["type"])]),emailCol:l(({scope:a})=>[e(k,{type:"warning"},{default:l(()=>[s(g(a.row.email),1)]),_:2},1024)]),statusCol:l(({scope:a})=>[e(Z,{modelValue:a.row.status,"onUpdate:modelValue":t=>a.row.status=t,loading:a.row.loadingStatus,"before-change":()=>J(a.row)},null,8,["modelValue","onUpdate:modelValue","loading","before-change"])]),operateExpand:l(({rowInfo:a})=>[e(I,{content:"分配角色",placement:"top",effect:"dark"},{default:l(()=>[e(E,{icon:"Setting",class:"mini",type:"success",onClick:t=>K(a)},null,8,["onClick"])]),_:2},1024)]),addForm:l(({formInfo:a})=>[e(j,{ref_key:"addCheckForm",ref:f,model:a,"label-width":"80px",rules:O},{default:l(()=>[e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"用户名",prop:"username"},{default:l(()=>[e(m,{modelValue:a.username,"onUpdate:modelValue":t=>a.username=t,placeholder:"请输入用户名"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"部门",prop:"departmentId"},{default:l(()=>[e(q,{modelValue:a.departmentId,"onUpdate:modelValue":t=>a.departmentId=t,clearable:"",placeholder:"请选择部门"},{default:l(()=>[(V(!0),w(S,null,M(_(x),t=>(V(),Y(B,{key:Number(t.id),label:t.name,value:Number(t.id)},{default:l(()=>[b("span",ke,g(t.name),1),b("span",xe,[e(k,{type:"primary"},{default:l(()=>[s(g(t.total)+"人",1)]),_:2},1024)])]),_:2},1032,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"昵称",prop:"nickname"},{default:l(()=>[e(m,{modelValue:a.nickname,"onUpdate:modelValue":t=>a.nickname=t,placeholder:"请输入昵称"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"性别",prop:"sex"},{default:l(()=>[e(z,{modelValue:a.sex,"onUpdate:modelValue":t=>a.sex=t},{default:l(()=>[e(U,{value:1,size:"large",style:{"padding-bottom":"3px"}},{default:l(()=>[s("男")]),_:1}),e(U,{value:0,size:"large",style:{"padding-bottom":"3px"}},{default:l(()=>[s("女")]),_:1})]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"手机号码",prop:"phoneNumber"},{default:l(()=>[e(m,{modelValue:a.phoneNumber,"onUpdate:modelValue":t=>a.phoneNumber=t,placeholder:"请输入手机号码"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"邮箱",prop:"email"},{default:l(()=>[e(m,{modelValue:a.email,"onUpdate:modelValue":t=>a.email=t,placeholder:"请输入邮箱"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"密码",prop:"password"},{default:l(()=>[e(m,{modelValue:a.password,"onUpdate:modelValue":t=>a.password=t,type:"password","show-password":"",placeholder:"请输入密码"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"生日",prop:"birth"},{default:l(()=>[e($,{modelValue:a.birth,"onUpdate:modelValue":t=>a.birth=t,type:"date",placeholder:"请选择日期",size:"default","value-format":"YYYY年MM月DD日"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["model","rules"])]),editorForm:l(({formInfo:a})=>[e(j,{ref_key:"editorCheckForm",ref:P,model:a,"label-width":"80px",rules:O},{default:l(()=>[e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"用户名",prop:"username"},{default:l(()=>[e(m,{disabled:"",modelValue:a.username,"onUpdate:modelValue":t=>a.username=t,placeholder:"请输入用户名"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"部门",prop:"departmentId"},{default:l(()=>[e(q,{modelValue:a.departmentId,"onUpdate:modelValue":t=>a.departmentId=t,clearable:"",placeholder:"请选择部门"},{default:l(()=>[(V(!0),w(S,null,M(_(x),t=>(V(),Y(B,{key:Number(t.id),label:t.name,value:Number(t.id)},{default:l(()=>[b("span",Ce,g(t.name),1),b("span",we,[e(W,{effect:"plain"},{default:l(()=>[s(g(t.total)+"人",1)]),_:2},1024)])]),_:2},1032,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"昵称",prop:"nickname"},{default:l(()=>[e(m,{modelValue:a.nickname,"onUpdate:modelValue":t=>a.nickname=t,placeholder:"请输入昵称"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"性别",prop:"sex"},{default:l(()=>[e(z,{modelValue:a.sex,"onUpdate:modelValue":t=>a.sex=t},{default:l(()=>[e(U,{value:1,size:"large",style:{"padding-bottom":"3px"}},{default:l(()=>[s("男")]),_:1}),e(U,{value:0,size:"large",style:{"padding-bottom":"3px"}},{default:l(()=>[s("女")]),_:1})]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"手机号码",prop:"phoneNumber"},{default:l(()=>[e(m,{modelValue:a.phoneNumber,"onUpdate:modelValue":t=>a.phoneNumber=t,placeholder:"请输入手机号码"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024),e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"邮箱",prop:"email"},{default:l(()=>[e(m,{modelValue:a.email,"onUpdate:modelValue":t=>a.email=t,placeholder:"请输入邮箱"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(i,null,{default:l(()=>[e(r,{span:24,lg:12},{default:l(()=>[e(d,{label:"生日",prop:"birth"},{default:l(()=>[e($,{modelValue:a.birth,"onUpdate:modelValue":t=>a.birth=t,type:"date",placeholder:"请选择日期",size:"default","value-format":"YYYY年MM月DD日"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["model","rules"])]),_:1},8,["addCheckForm","editorCheckForm"]),e(ae,{modelValue:_(y),"onUpdate:modelValue":p[1]||(p[1]=a=>ue(y)?y.value=a:y=a),title:"分配角色","before-close":L},{footer:l(()=>[e(E,{icon:"CloseBold",onClick:L},{default:l(()=>[s(" 取消分配 ")]),_:1}),e(E,{type:"primary",icon:"Setting",loading:_(C),onClick:Q},{default:l(()=>[s("确定分配")]),_:1},8,["loading"])]),default:l(()=>[b("div",Se,[e(le,{modelValue:v.value,"onUpdate:modelValue":p[0]||(p[0]=a=>v.value=a),data:D.value,filterable:"","filter-placeholder":"请输入搜索内容",titles:["可分配角色列表","已选中的角色列表"],"button-texts":["移除角色","添加角色"]},null,8,["modelValue","data"])])]),_:1},8,["modelValue"])],64)}}});export{qe as default};
