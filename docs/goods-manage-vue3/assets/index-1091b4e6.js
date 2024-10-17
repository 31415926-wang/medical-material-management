import{E as $,d as A,r as y,f as b,m as l,u as n,G as N,v as u,e as d,g as c,k as D,K as R,F as I,l as e,t as S,z as s,_ as G,j as Z,b as ee,o as le,S as ae,U as te,a as oe,D as O,p as ne,M as ue,A as re,B as se}from"./index-c2dc3635.js";import{u as de}from"./regionSelect-ce26e051.js";import"./destination-15a03689.js";const ie=m=>$({url:"/business/health/report",method:"post",data:m}),pe=m=>$({url:"/business/health/history",method:"get",params:m}),_e={class:"drawer-content"},ce=A({__name:"drawerRecord",props:{visiableDrawer:{type:Boolean}},emits:["update:visiableDrawer"],setup(m,{emit:w}){let f=y({pageNum:1,pageSize:5}),g=y(0),t=y(),U=w;const r=async()=>{N.openLoading(document.querySelector(".drawer-content"));let{data:k}=await pe(f.value);t.value=k.rows,g.value=k.total,N.closeLoading()},V=()=>{r()};return(k,h)=>{const Y=u("el-tag"),B=u("el-pagination"),x=u("el-drawer");return d(),b(x,{onOpen:r,"onUpdate:modelValue":h[1]||(h[1]=i=>n(U)("update:visiableDrawer",i)),"model-value":k.visiableDrawer,title:"签到记录",direction:"rtl"},{default:l(()=>[c("div",_e,[(d(!0),D(I,null,R(n(t),i=>(d(),D("ul",{key:i.id},[c("li",null,"打卡ID："+S(i.userId),1),c("li",null,"打卡位置"+S(i.address),1),c("li",null,"打卡时间"+S(i.createTime),1),c("li",null,[s("健康状况: "),e(Y,{type:i.situation==0?"success":"danger",effect:"dark",style:{float:"right"}},{default:l(()=>[s(S(i.situation==0?"健康":"发热"),1)]),_:2},1032,["type"])])]))),128)),e(B,{small:"",background:"",layout:"prev, pager, next",total:n(g),"current-page":n(f).pageNum,"onUpdate:currentPage":h[0]||(h[0]=i=>n(f).pageNum=i),onCurrentChange:V,"page-size":5,class:"pagination"},null,8,["total","current-page"])])]),_:1},8,["model-value"])}}});const me=G(ce,[["__scopeId","data-v-13ec1d0a"]]),P=m=>(re("data-v-101f4d09"),m=m(),se(),m),ve={class:"bt-box"},fe={class:"from"},ge=P(()=>c("div",{class:"title"},"基本信息",-1)),be=P(()=>c("div",{class:"hr"},null,-1)),ye=P(()=>c("div",{class:"title"},"健康打卡",-1)),Ve=P(()=>c("div",{class:"hr"},null,-1)),we=A({__name:"index",setup(m){let w=Z(),f;const g=y({username:"",nowtime:"",department:""}),t=y({passby:null,reception:null,situation:null,touch:null,address:"",province:"",city:"",origin:"",valueProvince:"",valueCity:"",valueOrigin:""});let U=y(),r=y(!1),V=y(!1),{reqSpareOption:k,options1:h,options2:Y,options3:B,getName:x}=de(t,"valueProvince","valueCity","valueOrigin");const i=ee({valueProvince:[{required:!0,message:"请选择省份",trigger:"change"}],valueCity:[{required:!0,message:"请选择城市",trigger:"change"}],valueOrigin:[{required:!0,message:"请选择区县",trigger:"change"}],touch:[{required:!0,message:"请勾选选项",trigger:"change"}],passby:[{required:!0,message:"请勾选选项",trigger:"change"}],reception:[{required:!0,message:"请勾选选项",trigger:"change"}],situation:[{required:!0,message:"请勾选选项",trigger:"change"}]}),K=async()=>{var C;console.log("点击提交",t.value),await((C=U.value)==null?void 0:C.validate());let{valueCity:j,valueOrigin:o,valueProvince:F}=t.value;t.value.province=x(F),t.value.city=x(j),t.value.origin=x(o),t.value.address=t.value.province+"/"+t.value.city+"/"+t.value.origin,N.openLoading(document.querySelector(".from")),ie(t.value).then(()=>{r.value=!0,T(),ue("success","打卡成功!")}).finally(()=>{N.closeLoading()})},J=()=>{U.value.resetFields()},T=()=>{f&&(clearInterval(f),f=void 0)},Q=()=>{V.value=!0};return le(()=>{k(),f=setInterval(()=>{g.value.nowtime=ae().format("YYYY-MM-DD HH:mm:ss")},1e3),te({title:"温馨提示",message:"您今日还未打卡,别忘记了哟~",type:"warning"})}),oe(()=>{T()}),(j,o)=>{const F=u("el-alert"),C=u("el-button"),z=u("el-input"),_=u("el-form-item"),W=u("el-date-picker"),E=u("el-form"),L=u("el-option"),M=u("el-select"),p=u("el-col"),X=u("el-tag"),H=u("el-row"),v=u("el-radio"),q=u("el-radio-group");return d(),D(I,null,[n(r)?(d(),b(F,{key:0,title:`今日已成功打卡,勤洗手,戴口罩,不群聚,打卡时间: [${g.value.nowtime}] `,type:"success",closable:!1,"show-icon":"",class:"alert-box"},null,8,["title"])):O("",!0),c("div",ve,[e(C,{type:"warning",onClick:Q},{default:l(()=>[s("签到记录")]),_:1}),n(r)?O("",!0):(d(),b(C,{key:0,type:"primary",onClick:K},{default:l(()=>[s("立即打卡")]),_:1})),n(r)?O("",!0):(d(),b(C,{key:1,onClick:J},{default:l(()=>[s("重置")]),_:1}))]),c("div",fe,[ge,be,e(E,{inline:!0,model:g.value,class:"demo-form-inline"},{default:l(()=>[e(_,{label:"打卡人"},{default:l(()=>[e(z,{modelValue:n(w).userInfo.nickname,"onUpdate:modelValue":o[0]||(o[0]=a=>n(w).userInfo.nickname=a),disabled:"",style:{width:"120px"}},null,8,["modelValue"])]),_:1}),e(_,{label:"打卡时间"},{default:l(()=>[e(W,{modelValue:g.value.nowtime,"onUpdate:modelValue":o[1]||(o[1]=a=>g.value.nowtime=a),type:"datetime",format:"YYYY/MM/DD HH:mm:ss",disabled:""},null,8,["modelValue"])]),_:1}),e(_,{label:"所属部门"},{default:l(()=>[e(z,{modelValue:n(w).userInfo.department,"onUpdate:modelValue":o[2]||(o[2]=a=>n(w).userInfo.department=a),disabled:""},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),ye,Ve,e(E,{ref_key:"recordFormRef",ref:U,model:t.value,rules:i,"label-position":"top",class:"record-form"},{default:l(()=>[e(H,{gutter:20},{default:l(()=>[e(p,{span:6},{default:l(()=>[e(_,{prop:"valueProvince",label:"省份"},{default:l(()=>[e(M,{modelValue:t.value.valueProvince,"onUpdate:modelValue":o[3]||(o[3]=a=>t.value.valueProvince=a),placeholder:"请选择省",disabled:n(r),clearable:""},{default:l(()=>[(d(!0),D(I,null,R(n(h),a=>(d(),b(L,{label:a.name,value:a.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue","disabled"])]),_:1})]),_:1}),e(p,{span:5},{default:l(()=>[e(_,{prop:"valueCity",label:"城市"},{default:l(()=>[e(M,{modelValue:t.value.valueCity,"onUpdate:modelValue":o[4]||(o[4]=a=>t.value.valueCity=a),placeholder:"请选择市",disabled:n(r),clearable:""},{default:l(()=>[(d(!0),D(I,null,R(n(Y),a=>(d(),b(L,{label:a.name,value:a.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue","disabled"])]),_:1})]),_:1}),e(p,{span:8},{default:l(()=>[e(_,{prop:"valueOrigin",label:"区县"},{default:l(()=>[e(M,{modelValue:t.value.valueOrigin,"onUpdate:modelValue":o[5]||(o[5]=a=>t.value.valueOrigin=a),placeholder:"请选择区",disabled:n(r),clearable:""},{default:l(()=>[(d(!0),D(I,null,R(n(B),a=>(d(),b(L,{label:a.name,value:a.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue","disabled"])]),_:1})]),_:1}),e(p,{span:5},{default:l(()=>[n(r)?(d(),b(_,{key:0,prop:"",label:"打卡位置"},{default:l(()=>[e(X,null,{default:l(()=>[s(S(t.value.address),1)]),_:1})]),_:1})):O("",!0)]),_:1})]),_:1}),e(H,{gutter:20},{default:l(()=>[e(p,{span:6},{default:l(()=>[e(_,{prop:"situation",label:"目前健康状况"},{default:l(()=>[e(q,{modelValue:t.value.situation,"onUpdate:modelValue":o[6]||(o[6]=a=>t.value.situation=a),disabled:n(r)},{default:l(()=>[e(v,{value:0},{default:l(()=>[s("健康")]),_:1}),e(v,{value:1},{default:l(()=>[s("有咳嗽发热症状")]),_:1}),e(v,{value:2},{default:l(()=>[s("其他情况")]),_:1})]),_:1},8,["modelValue","disabled"])]),_:1})]),_:1}),e(p,{span:5}),e(p,{span:8},{default:l(()=>[e(_,{prop:"reception",label:"接触的人是否有疑似症状?(冠状病毒检测结果为阳性或尚在等待检测结构)"},{default:l(()=>[e(q,{modelValue:t.value.reception,"onUpdate:modelValue":o[7]||(o[7]=a=>t.value.reception=a),disabled:n(r)},{default:l(()=>[e(v,{value:1},{default:l(()=>[s("是")]),_:1}),e(v,{value:0},{default:l(()=>[s("否")]),_:1})]),_:1},8,["modelValue","disabled"])]),_:1})]),_:1}),e(p,{span:5})]),_:1}),e(H,{gutter:20},{default:l(()=>[e(p,{span:6},{default:l(()=>[e(_,{prop:"passby",label:"自2020年1月1日起,是否在湖北省停留过(保存转车路过)"},{default:l(()=>[e(q,{modelValue:t.value.passby,"onUpdate:modelValue":o[8]||(o[8]=a=>t.value.passby=a),disabled:n(r)},{default:l(()=>[e(v,{value:1},{default:l(()=>[s("是")]),_:1}),e(v,{value:0},{default:l(()=>[s("否")]),_:1})]),_:1},8,["modelValue","disabled"])]),_:1})]),_:1}),e(p,{span:5}),e(p,{span:8},{default:l(()=>[e(_,{prop:"touch",label:"自2020年1月1日起,是否有接待过来自湖北的客户(亲戚或朋友)"},{default:l(()=>[e(q,{modelValue:t.value.touch,"onUpdate:modelValue":o[9]||(o[9]=a=>t.value.touch=a),disabled:n(r)},{default:l(()=>[e(v,{value:1},{default:l(()=>[s("是")]),_:1}),e(v,{value:0},{default:l(()=>[s("否")]),_:1})]),_:1},8,["modelValue","disabled"])]),_:1})]),_:1}),e(p,{span:5})]),_:1})]),_:1},8,["model","rules"])]),e(me,{visiableDrawer:n(V),"onUpdate:visiableDrawer":o[10]||(o[10]=a=>ne(V)?V.value=a:V=a)},null,8,["visiableDrawer"])],64)}}});const De=G(we,[["__scopeId","data-v-101f4d09"]]);export{De as default};
