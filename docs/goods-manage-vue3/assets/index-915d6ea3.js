import{d as destinationApiMethod}from"./destination-2e7af402.js";import{i as initCrud}from"./initCrud-b95b78e5.js";import{a as rulesValidatePhone}from"./validate-dc4b6a83.js";import{d as defineComponent,b as reactive,r as ref,f as createBlock,m as withCtx,u as unref,v as resolveComponent,e as openBlock,l as createVNode,g as createBaseVNode,t as toDisplayString,k as createElementBlock,D as renderList,F as Fragment}from"./index-ed8136fe.js";const _hoisted_1={style:{color:"#529b2e"}},_hoisted_2={style:{color:"#b88230"}},_hoisted_3={style:{color:"#f89898"}},_sfc_main=defineComponent({__name:"index",setup(__props){const rules=reactive({address1:[{required:!0,message:"请选择省份",trigger:"change"}],address2:[{required:!0,message:"请选择城市",trigger:"change"}],address3:[{required:!0,message:"请选择区县",trigger:"change"}],name:[{required:!0,message:"请输入详细地址",trigger:"blur"}],contact:[{required:!0,message:"请输入联系人",trigger:"blur"}],phone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{validator:rulesValidatePhone,trigger:"blur"}],sort:[{required:!0,message:"请输入排序号",trigger:"blur"}]});let tableCols=reactive([{prop:"address",label:"省市区县",searchType:"input",show:!1},{prop:"name",label:"地址",searchType:"input",show:!1},{prop:"createTime",label:"抵达时间",sortable:!0},{prop:"contact",label:"联系人",searchType:"input"},{prop:"phone",label:"电话"}]),addCheckForm=ref(),editorCheckForm=ref(),CrudTableRef=ref();const handleTable=l=>{l.rows.forEach(r=>{let o=r.address.split("/");r.address1=o[0],r.address2=o[1],r.address3=o[2]})};initCrud(CrudTableRef,{title:"物资去向",apiMethod:destinationApiMethod},tableCols,handleTable);const optionList=ref([]),options1=ref([]),options2=ref([]),options3=ref([]),reqSpareOption=async()=>{if(optionList.value.length>0)return 0;let l=await destinationApiMethod.getCityList();console.log("城市数据1",l.data),optionList.value=l.data,options1.value=optionList.value.filter(r=>!r.parent)},switchEvent=(index,selectValue,formInfo)=>{index!=2&&(optionList.value.forEach((l,r)=>{l.name==selectValue&&l.value}),eval(`(options${index+2}).value = optionList.value.filter((item) => {
        return item.parent == goalID
    })
    `),index==0&&(formInfo.address2=""),formInfo.address3="")},beforeSubmitHanle=l=>{if(l.value.address)return;let{address1:r,address2:o,address3:u}=l.value;l.value.address=[r,o,u].join("/"),l.value.address1=void 0,l.value.address2=void 0,l.value.address3=void 0};return(l,r)=>{const o=resolveComponent("el-table-column"),u=resolveComponent("el-option"),i=resolveComponent("el-select"),d=resolveComponent("el-form-item"),m=resolveComponent("el-col"),h=resolveComponent("el-row"),n=resolveComponent("el-input"),p=resolveComponent("el-input-number"),c=resolveComponent("el-form"),V=resolveComponent("CrudTable");return openBlock(),createBlock(V,{ref_key:"CrudTableRef",ref:CrudTableRef,addCheckForm:unref(addCheckForm),editorCheckForm:unref(editorCheckForm),needOperate:!0,closeViewDetail:!0,operateButtonType:"textType",operateColWidth:180,needReqDetail:!0,dialogWidths:{add:"35%",editor:"32%",detail:"34%"},onOpenDialogBefore:reqSpareOption,onBeforeSubmitHanle:beforeSubmitHanle},{nestCol:withCtx(()=>[createVNode(o,{label:"物资去向地址"},{default:withCtx(()=>[createVNode(o,{prop:"address1",label:"省份"},{default:withCtx(e=>[createBaseVNode("span",_hoisted_1,toDisplayString(e.row.address1),1)]),_:1}),createVNode(o,{prop:"address2",label:"市"},{default:withCtx(e=>[createBaseVNode("span",_hoisted_2,toDisplayString(e.row.address2),1)]),_:1}),createVNode(o,{prop:"address3",label:"区县"},{default:withCtx(e=>[createBaseVNode("span",_hoisted_3,toDisplayString(e.row.address3),1)]),_:1}),createVNode(o,{prop:"name",label:"地址"})]),_:1})]),addForm:withCtx(({formInfo:e})=>[createVNode(c,{ref_key:"addCheckForm",ref:addCheckForm,model:e,"label-width":"80px",rules},{default:withCtx(()=>[createVNode(h,null,{default:withCtx(()=>[(openBlock(),createElementBlock(Fragment,null,renderList(["省份","城市","区县"],(t,s)=>createVNode(m,{span:24,lg:8},{default:withCtx(()=>[createVNode(d,{label:t,prop:"address"+(s+1)},{default:withCtx(()=>[createVNode(i,{modelValue:e[`address${s+1}`],"onUpdate:modelValue":a=>e[`address${s+1}`]=a,placeholder:`请选择${t}`,onChange:a=>{switchEvent(s,a,e)}},{default:withCtx(()=>[s==0?(openBlock(!0),createElementBlock(Fragment,{key:0},renderList(options1.value,a=>(openBlock(),createBlock(u,{key:a.value,label:a.name,value:a.name},null,8,["label","value"]))),128)):s==1?(openBlock(!0),createElementBlock(Fragment,{key:1},renderList(options2.value,a=>(openBlock(),createBlock(u,{key:a.value,label:a.name,value:a.name},null,8,["label","value"]))),128)):(openBlock(!0),createElementBlock(Fragment,{key:2},renderList(options3.value,a=>(openBlock(),createBlock(u,{key:a.value,label:a.name,value:a.name},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","placeholder","onChange"])]),_:2},1032,["label","prop"])]),_:2},1024)),64))]),_:2},1024),createVNode(d,{label:"详细地址",prop:"name"},{default:withCtx(()=>[createVNode(n,{type:"textarea",modelValue:e.name,"onUpdate:modelValue":t=>e.name=t,placeholder:"请输入去向详细地址"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(d,{label:"联系人",prop:"contact"},{default:withCtx(()=>[createVNode(n,{modelValue:e.contact,"onUpdate:modelValue":t=>e.contact=t,placeholder:"请输入联系人"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(d,{label:"电话",prop:"phone"},{default:withCtx(()=>[createVNode(n,{modelValue:e.phone,"onUpdate:modelValue":t=>e.phone=t,placeholder:"请输入电话号码"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(d,{label:"排序",prop:"sort"},{default:withCtx(()=>[createVNode(p,{modelValue:e.sort,"onUpdate:modelValue":t=>e.sort=t,min:1},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["model","rules"])]),editorForm:withCtx(({formInfo:e})=>[createVNode(c,{ref_key:"editorCheckForm",ref:editorCheckForm,model:e,"label-width":"80px",rules},{default:withCtx(()=>[createVNode(d,{label:"省市区县",prop:"address"},{default:withCtx(()=>[createVNode(n,{modelValue:e.address,"onUpdate:modelValue":t=>e.address=t,disabled:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(d,{label:"详细地址",prop:"name"},{default:withCtx(()=>[createVNode(n,{type:"textarea",modelValue:e.name,"onUpdate:modelValue":t=>e.name=t,placeholder:"请输入去向详细地址"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(d,{label:"联系人",prop:"contact"},{default:withCtx(()=>[createVNode(n,{modelValue:e.contact,"onUpdate:modelValue":t=>e.contact=t,placeholder:"请输入联系人"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(d,{label:"电话",prop:"phone"},{default:withCtx(()=>[createVNode(n,{modelValue:e.phone,"onUpdate:modelValue":t=>e.phone=t,placeholder:"请输入电话号码"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),createVNode(d,{label:"排序",prop:"sort"},{default:withCtx(()=>[createVNode(p,{modelValue:e.sort,"onUpdate:modelValue":t=>e.sort=t,min:1},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["model","rules"])]),_:1},8,["addCheckForm","editorCheckForm"])}}});export{_sfc_main as default};
