import{d as z,q as ee,b as H,r as k,c as J,o as Q,$ as G,N as $,v as d,e as p,f as C,m as l,l as e,u as o,p as le,z as f,P as ae,Q as te,k as v,D as w,F as x,C as oe,t as S,_ as F,w as re,g as K}from"./index-ed8136fe.js";import{d as ue,A as ne}from"./shareData-091bd6ed.js";import{u as de}from"./regionSelect-fce6f048.js";import{f as se,a as pe}from"./storage-049634c8.js";import{i as W}from"./info-b25aa95a.js";import{i as ie}from"./initCrud-b95b78e5.js";import"./destination-2e7af402.js";const me={key:0},ce={key:1},_e={key:0},fe={key:0,class:"tag-box"},ge=z({__name:"baseform",setup(L){let T=ee();const O=H({valueProvince:[{required:!0,message:"请选择省份",trigger:"change"}],valueCity:[{required:!0,message:"请选择城市",trigger:"change"}],valueOrigin:[{required:!0,message:"请选择区县",trigger:"change"}],supplierId:[{required:!0,message:"请选择已知来源",trigger:"change"}],type:[{required:!0,message:"请填写入库类型",trigger:"blur"}],name:[{required:!0,message:"请填写具体来源",trigger:"blur"}],contact:[{required:!0,message:"请填写联系人",trigger:"blur"}],email:[{required:!0,message:"请填写邮箱",trigger:"blur"}],phone:[{required:!0,message:"请填写电话",trigger:"blur"}],sort:[{required:!0,message:"请填写序号",trigger:"blur"}],remark:[{required:!0,message:"请填写描述",trigger:"blur"}]});let a=k({address:"",province:"",city:"",origin:"",valueProvince:"",valueCity:"",valueOrigin:"",contact:"",email:"",name:"",phone:"",remark:"",sort:1,type:ue.donation,products:[],supplierId:void 0}),_=k(0),N=J(()=>a.value.products.length),h=k(),n=J(()=>{var u;return(u=h.value)==null?void 0:u.find(r=>r.id==a.value.supplierId)}),s=k(!1),g=k(),{reqSpareOption:y,options1:U,options2:R,options3:B,getName:I}=de(a,"valueProvince","valueCity","valueOrigin");const D=async()=>{var u;(u=g.value)==null||u.validate().then(()=>{if(a.value.products.length==0){$("info","请选择物资产品");return}if(_.value==0){let{valueCity:r,valueOrigin:b,valueProvince:P}=a.value;a.value.province=I(P),a.value.city=I(r),a.value.origin=I(b),a.value.address=a.value.province+"/"+a.value.city+"/"+a.value.origin,a.value.supplierId=void 0}else{let r=["type","supplierId","remark","sort","products"];for(let b in a.value)r.includes(b)||(a.value[b]=void 0)}a.value.products=a.value.products.map((r,b)=>({productId:r.id,productNumber:r.productNumber})),console.log("即将入库",a.value),s.value=!0,pe(a.value).then(()=>{$("success","物资入库成功"),T.push("/inventory/storage")}).finally(()=>{s.value=!1})}).catch(()=>{})},c=()=>{var u;(u=g.value)==null||u.resetFields(),console.log("重置",a),a.value.address="",a.value.province="",a.value.city="",a.value.origin=""};return Q(async()=>{y(),G.on("listChange",u=>{u.length>0&&u.forEach((r,b)=>{u[b].productNumber=r.productNumber?r.productNumber:1}),a.value.products=JSON.parse(JSON.stringify(u))}),se().then(u=>{h.value=u.data}).catch(()=>{$("error","获取已知来源失败")})}),(u,r)=>{const b=d("el-radio"),P=d("el-radio-group"),m=d("el-col"),E=d("el-text"),i=d("el-form-item"),q=d("el-option"),A=d("el-select"),M=d("el-row"),V=d("el-input"),X=d("el-input-number"),Y=d("el-tag"),j=d("el-button"),Z=d("el-form");return p(),C(Z,{ref_key:"formRef",ref:g,model:o(a),rules:O,"label-width":"85px"},{default:l(()=>[e(i,{label:"添加方式"},{default:l(()=>[e(m,{lg:12,span:24},{default:l(()=>[e(P,{modelValue:o(_),"onUpdate:modelValue":r[0]||(r[0]=t=>le(_)?_.value=t:_=t)},{default:l(()=>[e(b,{value:0,border:!0},{default:l(()=>[f("新增来源")]),_:1}),e(b,{value:1,border:!0},{default:l(()=>[f("已知来源")]),_:1})]),_:1},8,["modelValue"])]),_:1}),ae(e(m,{lg:12,span:24},{default:l(()=>[e(E,{type:"warning"},{default:l(()=>[f(" 注意：新增的去向信息会同步至物资来源")]),_:1})]),_:1},512),[[te,o(_)==0]])]),_:1}),e(i,{prop:"type",label:"入库类型"},{default:l(()=>[e(P,{modelValue:o(a).type,"onUpdate:modelValue":r[1]||(r[1]=t=>o(a).type=t)},{default:l(()=>[(p(!0),v(x,null,w(o(ne),t=>(p(),C(b,{label:t.value},{default:l(()=>[f(S(t.label),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1}),o(_)==0?(p(),v("div",me,[e(M,{gutter:0},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(i,{prop:"valueProvince",label:"省份"},{default:l(()=>[e(A,{modelValue:o(a).valueProvince,"onUpdate:modelValue":r[2]||(r[2]=t=>o(a).valueProvince=t),placeholder:"请选择省",clearable:""},{default:l(()=>[(p(!0),v(x,null,w(o(U),t=>(p(),C(q,{label:t.name,value:t.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{lg:8,span:24},{default:l(()=>[e(i,{prop:"valueCity",label:"城市"},{default:l(()=>[e(A,{modelValue:o(a).valueCity,"onUpdate:modelValue":r[3]||(r[3]=t=>o(a).valueCity=t),placeholder:"请选择市",clearable:""},{default:l(()=>[(p(!0),v(x,null,w(o(R),t=>(p(),C(q,{label:t.name,value:t.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{lg:8,span:24},{default:l(()=>[e(i,{prop:"valueOrigin",label:"区县"},{default:l(()=>[e(A,{modelValue:o(a).valueOrigin,"onUpdate:modelValue":r[4]||(r[4]=t=>o(a).valueOrigin=t),placeholder:"请选择区县",clearable:""},{default:l(()=>[(p(!0),v(x,null,w(o(B),t=>(p(),C(q,{label:t.name,value:t.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(i,{prop:"name",label:"具体来源"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(V,{modelValue:o(a).name,"onUpdate:modelValue":r[5]||(r[5]=t=>o(a).name=t),placeholder:"请输入具体来源名称"},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{prop:"contact",label:"联系人"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(V,{modelValue:o(a).contact,"onUpdate:modelValue":r[6]||(r[6]=t=>o(a).contact=t),placeholder:"请输入联系人名称"},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{prop:"email",label:"邮箱"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(V,{modelValue:o(a).email,"onUpdate:modelValue":r[7]||(r[7]=t=>o(a).email=t),placeholder:"请输入邮箱"},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{prop:"phone",label:"电话"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(V,{modelValue:o(a).phone,"onUpdate:modelValue":r[8]||(r[8]=t=>o(a).phone=t),placeholder:"请输入电话"},null,8,["modelValue"])]),_:1})]),_:1})])):(p(),v("div",ce,[e(i,{prop:"supplierId",label:"物资来源"},{default:l(()=>[e(A,{modelValue:o(a).supplierId,"onUpdate:modelValue":r[9]||(r[9]=t=>o(a).supplierId=t),placeholder:"请选择已知来源",clearable:""},{default:l(()=>[(p(!0),v(x,null,w(o(h),t=>(p(),C(q,{label:t.name,value:t.id},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1}),o(n)?(p(),v("div",_e,[e(i,{label:"物资地址"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(V,{modelValue:o(n).address,"onUpdate:modelValue":r[10]||(r[10]=t=>o(n).address=t),disabled:""},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{label:"联系方式"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(V,{modelValue:o(n).phone,"onUpdate:modelValue":r[11]||(r[11]=t=>o(n).phone=t),disabled:""},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{label:"电子邮件"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(V,{modelValue:o(n).email,"onUpdate:modelValue":r[12]||(r[12]=t=>o(n).email=t),disabled:""},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{label:"联系人员"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(V,{modelValue:o(n).contact,"onUpdate:modelValue":r[13]||(r[13]=t=>o(n).contact=t),disabled:""},null,8,["modelValue"])]),_:1})]),_:1})])):oe("",!0)])),e(M,{gutter:30},{default:l(()=>[e(m,{span:12},{default:l(()=>[e(i,{prop:"sort",label:"排序"},{default:l(()=>[e(X,{modelValue:o(a).sort,"onUpdate:modelValue":r[14]||(r[14]=t=>o(a).sort=t),size:"small",min:1,max:100},null,8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(i,{label:"物资总类"},{default:l(()=>[e(E,{type:"success"},{default:l(()=>[f("已选 "+S(o(N))+" 个",1)]),_:1})]),_:1})]),_:1})]),_:1}),e(i,{label:"物资明细"},{default:l(()=>[o(a).products.length>0?(p(),v("div",fe,[(p(!0),v(x,null,w(o(a).products,t=>(p(),C(Y,{type:"warning"},{default:l(()=>[f(S(t.name),1)]),_:2},1024))),256))])):(p(),C(E,{key:1,type:"warning"},{default:l(()=>[f("请在右侧选择物资")]),_:1}))]),_:1}),e(i,{prop:"remark",label:"描述信息"},{default:l(()=>[e(V,{modelValue:o(a).remark,"onUpdate:modelValue":r[15]||(r[15]=t=>o(a).remark=t),type:"textarea",placeholder:"请填写描述信息"},null,8,["modelValue"])]),_:1}),e(i,null,{default:l(()=>[e(j,{type:"primary",loading:o(s),onClick:D},{default:l(()=>[f("立即入库")]),_:1},8,["loading"]),e(j,{onClick:c},{default:l(()=>[f("重置")]),_:1})]),_:1})]),_:1},8,["model","rules"])}}});const be=F(ge,[["__scopeId","data-v-b2179d72"]]),ve={class:"alert-container"},ye=z({__name:"baseTable",setup(L){let T=H([{prop:"name",label:"物资名称",searchType:"input"},{prop:"model",label:"物资规格",rebuild:!0,width:140},{prop:"unit",label:"单位",rebuild:!0,width:90},{prop:"remark",label:"备注"},{prop:"productNumber",label:"入库数量",rebuild:!0,width:160}]);const O=n=>{n.rows.forEach(s=>{s.productNumber=0})};let a=k();ie(a,{title:"物资",apiMethod:W,searchParam:{status:0},pagination:{page:1,size:6}},T,O);let _=k([]),N=k({value:"id",label:"name",expandTrigger:"hover",checkStrictly:!0});const h=(n,s)=>{s.categorys=n.join()};return re(()=>{var n,s,g,y;return(y=(g=(s=(n=a.value)==null?void 0:n.hookCrudObject)==null?void 0:s.crudInfo)==null?void 0:g.value)==null?void 0:y.selectedItems},(n,s)=>{if(G.emit("listChange",n),(n==null?void 0:n.length)<(s==null?void 0:s.length)){let g=[];n.forEach(y=>{g.push(y.id)}),s.forEach((y,U)=>{g.includes(y.id)||(s[U].productNumber=0)})}},{deep:!0}),Q(async()=>{let n=await W.getCategoryTree();_.value=n.data.rows}),(n,s)=>{const g=d("el-cascader"),y=d("el-form-item"),U=d("el-alert"),R=d("el-text"),B=d("el-tag"),I=d("el-input-number"),D=d("CrudTable");return p(),C(D,{ref_key:"CrudTableRef",ref:a,"default-tool-bt-list":[],dialogWidths:{add:"32%",editor:"32%",detail:"34%"},needIndex:!1,needBatch:!0,hiddenToolSection:!0,rowHeight:"62px",pageSizes:[6,12,18,24]},{"search-custom":l(({scope:c})=>[e(y,{label:"分类查询"},{default:l(()=>[e(g,{modelValue:c.searchParam.categorys,"onUpdate:modelValue":u=>c.searchParam.categorys=u,onChange:u=>{h(u,c.searchParam)},options:o(_),props:o(N),clearable:"",placeholder:"请选择分类查询"},null,8,["modelValue","onUpdate:modelValue","onChange","options","props"])]),_:2},1024)]),batchSlot:l(()=>[K("div",ve,[e(U,{title:"物资明细：勾选先下方物资后,添加其入库数量",type:"info",closable:!1,"show-icon":"",class:"alert-box"})])]),unitCol:l(({scope:c})=>[e(R,{type:"warning"},{default:l(()=>{var u;return[f(S((u=c.row)==null?void 0:u.unit),1)]}),_:2},1024)]),modelCol:l(({scope:c})=>[e(B,null,{default:l(()=>{var u;return[f(S((u=c.row)==null?void 0:u.model),1)]}),_:2},1024)]),productNumberCol:l(({scope:c})=>[e(I,{modelValue:c.row.productNumber,"onUpdate:modelValue":u=>c.row.productNumber=u,size:"small",min:c.row.productNumber==0?0:1,max:1e3,disabled:c.row.productNumber==0},null,8,["modelValue","onUpdate:modelValue","min","disabled"])]),_:1},512)}}});const he=F(ye,[["__scopeId","data-v-a6d938db"]]),Ve={class:"card-box"},Ce=z({__name:"index",setup(L){return(T,O)=>{const a=d("DArrowLeft"),_=d("el-icon"),N=d("router-link"),h=d("el-step"),n=d("el-steps"),s=d("el-card");return p(),v(x,null,[e(N,{class:"link",to:"/inventory/storage"},{default:l(()=>[e(_,null,{default:l(()=>[e(a)]),_:1}),f(" 返回入库记录")]),_:1}),K("div",Ve,[e(s,{class:"left-card"},{default:l(()=>[e(n,{space:200,active:1,simple:"",class:"steps"},{default:l(()=>[e(h,{title:"填写",icon:"EditPen"}),e(h,{title:"审核",icon:"Postcard"}),e(h,{title:"入库",icon:"Operation"})]),_:1}),e(be)]),_:1}),e(s,{class:"right-card"},{default:l(()=>[e(he)]),_:1})])],64)}}});const Te=F(Ce,[["__scopeId","data-v-0b67d589"]]);export{Te as default};
