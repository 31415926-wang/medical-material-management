import{E as service,d as defineComponent,b as reactive,r as ref,f as createBlock,m as withCtx,u as unref,v as resolveComponent,e as openBlock,l as createVNode,g as createBaseVNode,t as toDisplayString,k as createElementBlock,K as renderList,F as Fragment}from"./index-f29751aa.js";import{i as initCrud}from"./initCrud-08564742.js";import{r as rulesValidateEmail,a as rulesValidatePhone}from"./validate-dc4b6a83.js";const getList=t=>service({url:"/business/supplier/findSupplierList",method:"get",params:t}),getDetailById=t=>service({url:"/business/supplier/edit/"+t,method:"get"}),addItem=t=>service({url:"/business/supplier/add",method:"post",data:t}),updateItem=t=>service({url:"/business/supplier/update/"+t.id,method:"put",data:t}),deleteItem=t=>service({url:"/business/supplier/delete/"+t,method:"DELETE"}),getCityList=()=>service({url:"/json/provinces.json",method:"get"}),sourceApiMethod={getList,getDetailById,getCityList,deleteItem,addItem,updateItem},_hoisted_1={style:{color:"#529b2e"}},_hoisted_2={style:{color:"#b88230"}},_hoisted_3={style:{color:"#f89898"}},_sfc_main=defineComponent({__name:"index",setup(__props){const rules=reactive({address1:[{required:!0,message:"请选择省份",trigger:"change"}],address2:[{required:!0,message:"请选择城市",trigger:"change"}],address3:[{required:!0,message:"请选择区县",trigger:"change"}],name:[{required:!0,message:"请输入详细地址",trigger:"blur"}],contact:[{required:!0,message:"请输入联系人",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{validator:rulesValidateEmail,trigger:"blur"}],phone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:rulesValidatePhone,trigger:"blur"}],sort:[{required:!0,message:"请输入排序号",trigger:"blur"}]});let tableCols=reactive([{prop:"address",label:"省市区县",searchType:"input",show:!1},{prop:"name",label:"地址",searchType:"input",show:!1},{prop:"createTime",label:"创建时间"},{prop:"email",label:"邮箱"},{prop:"contact",label:"联系人",searchType:"input"},{prop:"phone",label:"电话"}]),addCheckForm=ref(),editorCheckForm=ref(),CrudTableRef=ref();const handleTable=t=>{t.rows.forEach(d=>{let r=d.address.split("/");d.address1=r[0],d.address2=r[1],d.address3=r[2]})};initCrud(CrudTableRef,{title:"物资来源",apiMethod:sourceApiMethod},tableCols,handleTable);const optionList=ref([]),options1=ref([]),options2=ref([]),options3=ref([]),reqSpareOption=async()=>{if(optionList.value.length>0)return 0;let t=await sourceApiMethod.getCityList();console.log("城市数据",t.data),optionList.value=t.data,options1.value=optionList.value.filter(d=>!d.parent)},switchEvent=(index,selectValue,formInfo)=>{index!=2&&(optionList.value.forEach((t,d)=>{t.name==selectValue&&t.value}),eval(`(options${index+2}).value = optionList.value.filter((item) => {
        return item.parent == goalID
    })
    `),index==0&&(formInfo.address2=""),formInfo.address3="")},beforeSubmitHanle=t=>{if(t.value.address)return;let{address1:d,address2:r,address3:u}=t.value;t.value.address=[d,r,u].join("/"),t.value.address1=void 0,t.value.address2=void 0,t.value.address3=void 0};return(t,d)=>{const r=resolveComponent("el-table-column"),u=resolveComponent("el-option"),c=resolveComponent("el-select"),o=resolveComponent("el-form-item"),m=resolveComponent("el-col"),h=resolveComponent("el-row"),s=resolveComponent("el-input"),p=resolveComponent("el-input-number"),i=resolveComponent("el-form"),V=resolveComponent("CrudTable");return openBlock(),createBlock(V,{ref_key:"CrudTableRef",ref:CrudTableRef,addCheckForm:unref(addCheckForm),editorCheckForm:unref(editorCheckForm),needOperate:!0,closeViewDetail:!0,operateButtonType:"textType",operateColWidth:180,needReqDetail:!0,dialogWidths:{add:"35%",editor:"32%",detail:"34%"},onOpenDialogBefore:reqSpareOption,onBeforeSubmitHanle:beforeSubmitHanle},{nestCol:withCtx(()=>[createVNode(r,{label:"物资提供方地址"},{default:withCtx(()=>[createVNode(r,{prop:"address1",label:"省份"},{default:withCtx(e=>[createBaseVNode("span",_hoisted_1,toDisplayString(e.row.address1),1)]),_:1}),createVNode(r,{prop:"address2",label:"市"},{default:withCtx(e=>[createBaseVNode("span",_hoisted_2,toDisplayString(e.row.address2),1)]),_:1}),createVNode(r,{prop:"address3",label:"区县"},{default:withCtx(e=>[createBaseVNode("span",_hoisted_3,toDisplayString(e.row.address3),1)]),_:1}),createVNode(r,{prop:"name",label:"地址"})]),_:1})]),addForm:withCtx(({formInfo:e})=>[createVNode(i,{ref_key:"addCheckForm",ref:addCheckForm,model:e,"label-width":"80px",rules},{default:withCtx(()=>[createVNode(h,null,{default:withCtx(()=>[(openBlock(),createElementBlock(Fragment,null,renderList(["省份","城市","区县"],(l,n)=>createVNode(m,{span:24,lg:8},{default:withCtx(()=>[createVNode(o,{label:l,prop:"address"+(n+1)},{default:withCtx(()=>[createVNode(c,{modelValue:e[`address${n+1}`],"onUpdate:modelValue":a=>e[`address${n+1}`]=a,placeholder:`请选择${l}`,onChange:a=>{switchEvent(n,a,e)}},{default:withCtx(()=>[n==0?(openBlock(!0),createElementBlock(Fragment,{key:0},renderList(options1.value,a=>(openBlock(),createBlock(u,{key:a.value,label:a.name,value:a.name},null,8,["label","value"]))),128)):n==1?(openBlock(!0),createElementBlock(Fragment,{key:1},renderList(options2.value,a=>(openBlock(),createBlock(u,{key:a.value,label:a.name,value:a.name},null,8,["label","value"]))),128)):(openBlock(!0),createElementBlock(Fragment,{key:2},renderList(options3.value,a=>(openBlock(),createBlock(u,{key:a.value,label:a.name,value:a.name},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","placeholder","onChange"])]),_:2},1032,["label","prop"])]),_:2},1024)),64))]),_:2},1024),createVNode(o,{label:"详细地址",prop:"name"},{default:withCtx(()=>[createVNode(s,{type:"textarea",modelValue:e.name,"onUpdate:modelValue":l=>e.name=l,placeholder:"请输入来源详细地址"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"联系人",prop:"contact"},{default:withCtx(()=>[createVNode(s,{modelValue:e.contact,"onUpdate:modelValue":l=>e.contact=l,placeholder:"请输入联系人"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"邮箱",prop:"email"},{default:withCtx(()=>[createVNode(s,{modelValue:e.email,"onUpdate:modelValue":l=>e.email=l,placeholder:"请输入邮箱地址"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"电话",prop:"phone"},{default:withCtx(()=>[createVNode(s,{modelValue:e.phone,"onUpdate:modelValue":l=>e.phone=l,placeholder:"请输入电话号码"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"排序",prop:"sort"},{default:withCtx(()=>[createVNode(p,{modelValue:e.sort,"onUpdate:modelValue":l=>e.sort=l,min:1},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["model","rules"])]),editorForm:withCtx(({formInfo:e})=>[createVNode(i,{ref_key:"editorCheckForm",ref:editorCheckForm,model:e,"label-width":"80px",rules},{default:withCtx(()=>[createVNode(o,{label:"省市区县",prop:"address"},{default:withCtx(()=>[createVNode(s,{modelValue:e.address,"onUpdate:modelValue":l=>e.address=l,disabled:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"详细地址",prop:"name"},{default:withCtx(()=>[createVNode(s,{type:"textarea",modelValue:e.name,"onUpdate:modelValue":l=>e.name=l,placeholder:"请输入来源详细地址"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"联系人",prop:"contact"},{default:withCtx(()=>[createVNode(s,{modelValue:e.contact,"onUpdate:modelValue":l=>e.contact=l,placeholder:"请输入联系人"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"邮箱",prop:"email"},{default:withCtx(()=>[createVNode(s,{modelValue:e.email,"onUpdate:modelValue":l=>e.email=l,placeholder:"请输入邮箱地址"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"电话",prop:"phone"},{default:withCtx(()=>[createVNode(s,{modelValue:e.phone,"onUpdate:modelValue":l=>e.phone=l,placeholder:"请输入电话号码"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(o,{label:"排序",prop:"sort"},{default:withCtx(()=>[createVNode(p,{modelValue:e.sort,"onUpdate:modelValue":l=>e.sort=l,min:1},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["model","rules"])]),_:1},8,["addCheckForm","editorCheckForm"])}}});export{_sfc_main as default};
