import{d as ie,o as ne,a as ve,r as S,b as G,w as te,c as U,e as le,f as me,g as i,h as ae,n as M,i as R,u as l,t as se,T as fe,j as ge,k as we,l as h,m as T,p as oe,q as xe,s as Xe,v as A,x as _e,y as ye,z as be,A as Te,B as Se,_ as Ye}from"./index-14e5c0a4.js";const Be="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAELklEQVRYR+2YW2wUZRTH//9vtlCoF9IoIklT3PqgPGi326hoetuaGEhIr9SgCYkkgt2WGOQVCca+GavWdr0GjD4YhG3RB3hply1LQA1tEQIxEXapGI2pEkys9LIzx2ylYWfY6e5sF0oi+7hzzvl+3/9855xvhrjNf7zN+XAHcL4Z+n8o6JWTeYt++W25S596AIZy6TB+n3yo+Nchlk8vmIIVowdXU9c3Q1gDSilBlQwjgBAYFGDvdF58/4milqvZwDpOcXWsb5Uh8hmBqkwXFMhlCN8aX5LXNbRy/T+Z+iXsHAFWRXs3QGQPyLucLDJrK5DgUXdTsxPfjAEro8E3Ce50EtxsKxPTwCPH3U2jTmJkBJgWTnAMxDeGMEoa0xQ+LJQnCD4HYFkCyAC3RdwN3U7gMkpxRTTYrMD91sCJIgCxV5R6O1Jcfy7VwonqLoj9/CqB2kF341qncGkBvRe+ureAWpRgoalCBecMFzcdK24YymZRJz5zprgq1tsJwXYL3CVZGvdGHmwZc7JQtra2gE+f712ep2QUYP714DJhaJrXLqXZQszlZwtYdSHoB9ljVk/ePVrSZFL0ZkAlxzQBVseCT8WhZhRThtFB8plk9Zi/qCi8cv0fNxvKFrDy4oF11NXXIFy2EII4iBcG3Y03VLZT8OqRd5aFPduvOEpxRayvXolxAKB2g6NgEhobBlc1HHYKY7WvHf5wtVAPgegIlbbZ9seUZ7AyFnwewi9pGoUyDmhrB931kfnC1ZwOeKlLP8GZJi6QLSFP2yep4toXSbT3ZQAfX3O6omt8Nhd9r/aHQAUMOQywYBZo5uZD2ThQ2rbPCjlnH6yI9rUryE5DU75ctJaake46Be4DuDjF8dFBNA94/AdtiySVxIlpMlTS8td801o70vMigM9huTda2lhcKHVHPO2HZv/P6LIwX7hk/+qzPSvUJGMkrg8AQYTkroRdXMlE+HH/twsG6BsOdJHYZlaO/lBZ6weOiiSXqs3Gqj0TeAxx+T75DIpgwjC0onD51pQD4JaluPrkR/cpFT9DcoVp84LOgTL/DjtBbglgou+puHwB8lEznPxJw1XSX77VtgizBvQNBw4RMqB7xt4Lc3c8lQKJaQHoO4R8ydz0/7MWoCXk8c85MrMC9J3qaafw/WtQlwXST+F3BnAeYB4obgJ1BJIuG+YtiKAjVOZ/Pd1ZdwzoG+4uBtSPpjaRbhXLcwF3hzytb2TilgVgT5BkYybBrTYC+Rvg5nRpdTRJrIs8+VPXPQXj2i4ItxC4O2NQQUQnN4U9rRcz9nH64p4ceM2lziX5Y4s3KHCdUHwE77ecMkMEp6BwhIa2Z6DslZRvfulgHafYLuCas58WLp2aLCFUga70qxOFU6dPFL2W1feYeaU43Y5z/TxnCuYabMEuC043ckdBp4pZ7f8FE5psOI1g6fwAAAAASUVORK5CYII=",Ce=["width","height"],Ie=["width","height"],Me=["width","height"],Ae=i("div",{class:"loading-gif_"},[i("span"),i("span"),i("span"),i("span"),i("span")],-1),ze=[Ae],ke={class:"auth-control_"},He={class:"range-text"},Re=i("div",null,null,-1),We=i("div",null,null,-1),Le=i("div",null,null,-1),De=[Re,We,Le],Pe=ie({__name:"App",props:{type:{type:String,default:"modal"},canvasWidth:{type:Number,default:310},canvasHeight:{type:Number,default:160},show:{type:Boolean,default:!1},puzzleScale:{type:Number,default:1},sliderSize:{type:Number,default:50},range:{type:Number,default:10},zIndex:{type:Number,default:999},imgs:{type:Array,default:null},successText:{type:String,default:"验证通过！"},failText:{type:String,default:"验证失败，请重试"},sliderText:{type:String,default:"拖动滑块完成拼图"},className:{type:String,default:""}},emits:["success","fail","close","reset"],setup(r,{expose:b,emit:Y}){const o=r;ne(()=>{document.addEventListener("mousemove",C,!1),document.addEventListener("mouseup",x,!1),document.addEventListener("touchmove",C,{passive:!1}),document.addEventListener("touchend",x,!1),t.isInside=o.type==="inside",o.show&&(!t.isInside&&document.body.classList.add("vue-puzzle-overflow"),D())}),ve(()=>{t.timer1&&clearTimeout(t.timer1),document.removeEventListener("mousemove",C,!1),document.removeEventListener("mouseup",x,!1),document.removeEventListener("touchmove",C,!1),document.removeEventListener("touchend",x,!1)});const V=S(),O=S(),W=S(),B=S(),t=G({isInside:!1,mouseDown:!1,startWidth:50,startX:0,newX:0,pinX:0,pinY:0,loading:!1,isCanSlide:!1,error:!1,infoBoxShow:!1,infoText:"",infoBoxFail:!1,timer1:void 0,closeDown:!1,isSuccess:!1,imgIndex:-1,isSubmting:!1});te(()=>o.show,a=>{a?(!t.isInside&&document.body.classList.add("vue-puzzle-overflow"),D()):(t.isSubmting=!1,t.isSuccess=!1,t.infoBoxShow=!1,document.body.classList.remove("vue-puzzle-overflow"))}),te(()=>o.type,a=>{a==="inside"?(t.isInside=!0,document.body.classList.remove("vue-puzzle-overflow")):t.isInside=!1});const m=U(()=>{const a=t.startWidth+t.newX-t.startX;return a<u.value?u.value:a>o.canvasWidth?o.canvasWidth:a}),d=U(()=>Math.round(Math.max(Math.min(o.puzzleScale,2),.2)*52.5+6)),u=U(()=>Math.max(Math.min(Math.round(o.sliderSize),Math.round(o.canvasWidth*.5)),10)),Z=U(()=>o.zIndex!==999?`z-index:${o.zIndex}`:""),Q=()=>{!t.mouseDown&&!t.isSubmting&&(t.timer1&&clearTimeout(t.timer1),Y("close"))},L=()=>{t.isInside||(t.closeDown=!0)},p=()=>{t.closeDown&&Q(),t.closeDown=!1},w=a=>{var s;t.isCanSlide&&(t.mouseDown=!0,t.startWidth=((s=V.value)==null?void 0:s.clientWidth)||0,t.newX=a.clientX!==void 0?a.clientX:a.changedTouches[0].clientX,t.startX=a.clientX!==void 0?a.clientX:a.changedTouches[0].clientX)},C=a=>{t.mouseDown&&(a.preventDefault(),t.newX=a.clientX!==void 0?a.clientX:a.changedTouches[0].clientX)},x=()=>{t.mouseDown&&(t.mouseDown=!1,de())},E=(a=!1)=>{var s;if(t.loading&&!a)return;t.loading=!0,t.isCanSlide=!1;const c=O.value,v=W.value,f=B.value,e=c==null?void 0:c.getContext("2d",{willReadFrequently:!0}),_=v==null?void 0:v.getContext("2d"),F=f==null?void 0:f.getContext("2d");if(!e||!_||!F){console.error("not found ctx / ctx2 / ctx3");return}const ue=navigator.userAgent.indexOf("Firefox")>=0&&navigator.userAgent.indexOf("Windows")>=0,y=document.createElement("img");if(e.fillStyle="rgba(255,255,255,1)",F.fillStyle="rgba(255,255,255,1)",e.clearRect(0,0,o.canvasWidth,o.canvasHeight),_.clearRect(0,0,o.canvasWidth,o.canvasHeight),t.pinX=n(d.value+20,o.canvasWidth-d.value-10),t.pinY=n(20,o.canvasHeight-d.value-10),y.crossOrigin="anonymous",y.onload=()=>{const[g,q,$,J]=N(y),j=Math.random(),K=Math.random(),ee=Math.random(),he=Math.random(),P=j<.33?-1:j<.66?0:1,k=K<.33?-1:K<.66?0:1,H=ee<.33?-1:ee<.66?0:1;let I=he<.6?1:0;P===k&&k===H&&H===I&&I===0&&(I=1),e.save(),z(e,P,k,H,I),e.closePath(),ue?(e.clip(),e.save(),e.shadowOffsetX=0,e.shadowOffsetY=0,e.shadowColor="#000",e.shadowBlur=3,e.fill(),e.restore()):(e.shadowOffsetX=0,e.shadowOffsetY=0,e.shadowColor="#000",e.shadowBlur=3,e.fill(),e.clip()),e.drawImage(y,g,q,$,J),F.fillRect(0,0,o.canvasWidth,o.canvasHeight),F.drawImage(y,g,q,$,J),e.globalCompositeOperation="source-atop",z(e,P,k,H,I),e.arc(t.pinX+Math.ceil(d.value/2),t.pinY+Math.ceil(d.value/2),d.value*1.2,0,Math.PI*2,!0),e.closePath(),e.shadowColor="rgba(255, 255, 255, .8)",e.shadowOffsetX=-1,e.shadowOffsetY=-1,e.shadowBlur=Math.min(Math.ceil(8*o.puzzleScale),12),e.fillStyle="#ffffaa",e.fill();const pe=e.getImageData(t.pinX-3,t.pinY-20,t.pinX+d.value+5,t.pinY+d.value+5);_.putImageData(pe,0,t.pinY-20),e.restore(),e.clearRect(0,0,o.canvasWidth,o.canvasHeight),e.save(),z(e,P,k,H,I),e.globalAlpha=.8,e.fillStyle="#ffffff",e.fill(),e.restore(),e.save(),e.globalCompositeOperation="source-atop",z(e,P,k,H,I),e.arc(t.pinX+Math.ceil(d.value/2),t.pinY+Math.ceil(d.value/2),d.value*1.2,0,Math.PI*2,!0),e.shadowColor="#000",e.shadowOffsetX=2,e.shadowOffsetY=2,e.shadowBlur=16,e.fill(),e.restore(),e.save(),e.globalCompositeOperation="destination-over",e.drawImage(y,g,q,$,J),e.restore(),t.loading=!1,t.isCanSlide=!0},y.onerror=()=>{E(!0)},!a&&(s=o.imgs)!=null&&s.length){let g=n(0,o.imgs.length-1);g===t.imgIndex&&(g===o.imgs.length-1?g=0:g++),t.imgIndex=g,y.src=o.imgs[g]}else y.src=X()},n=(a,s)=>Math.ceil(Math.random()*(s-a)+a),N=a=>{const s=a.width/a.height,c=o.canvasWidth/o.canvasHeight;let v=0,f=0,e=0,_=0;return s>c?(_=o.canvasHeight,e=s*_,f=0,v=(o.canvasWidth-e)/2):(e=o.canvasWidth,_=e/s,v=0,f=(o.canvasHeight-_)/2),[v,f,e,_]},z=(a,s,c,v,f)=>{const e=Math.ceil(15*o.puzzleScale);a.beginPath(),a.moveTo(t.pinX,t.pinY),a.lineTo(t.pinX+e,t.pinY),a.arcTo(t.pinX+e,t.pinY+s*e/2,t.pinX+e+e/2,t.pinY+s*e/2,e/2),a.arcTo(t.pinX+e+e,t.pinY+s*e/2,t.pinX+e+e,t.pinY,e/2),a.lineTo(t.pinX+e+e+e,t.pinY),a.lineTo(t.pinX+e+e+e,t.pinY+e),a.arcTo(t.pinX+e+e+e+c*e/2,t.pinY+e,t.pinX+e+e+e+c*e/2,t.pinY+e+e/2,e/2),a.arcTo(t.pinX+e+e+e+c*e/2,t.pinY+e+e,t.pinX+e+e+e,t.pinY+e+e,e/2),a.lineTo(t.pinX+e+e+e,t.pinY+e+e+e),a.lineTo(t.pinX+e+e,t.pinY+e+e+e),a.arcTo(t.pinX+e+e,t.pinY+e+e+e+v*e/2,t.pinX+e+e/2,t.pinY+e+e+e+v*e/2,e/2),a.arcTo(t.pinX+e,t.pinY+e+e+e+v*e/2,t.pinX+e,t.pinY+e+e+e,e/2),a.lineTo(t.pinX,t.pinY+e+e+e),a.lineTo(t.pinX,t.pinY+e+e),a.arcTo(t.pinX+f*e/2,t.pinY+e+e,t.pinX+f*e/2,t.pinY+e+e/2,e/2),a.arcTo(t.pinX+f*e/2,t.pinY+e,t.pinX,t.pinY+e,e/2),a.lineTo(t.pinX,t.pinY)},X=()=>{const a=document.createElement("canvas"),s=a.getContext("2d");if(!s)return console.error("not found ctx"),"";a.width=o.canvasWidth,a.height=o.canvasHeight,s.fillStyle=`rgb(${n(100,255)},${n(100,255)},${n(100,255)})`,s.fillRect(0,0,o.canvasWidth,o.canvasHeight);for(let c=0;c<12;c++)if(s.fillStyle=`rgb(${n(100,255)},${n(100,255)},${n(100,255)})`,s.strokeStyle=`rgb(${n(100,255)},${n(100,255)},${n(100,255)})`,n(0,2)>1)s.save(),s.rotate(n(-90,90)*Math.PI/180),s.fillRect(n(-20,a.width-20),n(-20,a.height-20),n(10,a.width/2+10),n(10,a.height/2+10)),s.restore();else{s.beginPath();const v=n(-Math.PI,Math.PI);s.arc(n(0,a.width),n(0,a.height),n(10,a.height/2+10),v,v+Math.PI*1.5),s.closePath(),s.fill()}return a.toDataURL("image/png")},de=()=>{t.isSubmting=!0;const a=m.value-u.value-(d.value-u.value)*((m.value-u.value)/(o.canvasWidth-u.value)),s=t.pinX-3-a;Math.abs(s)<o.range?(t.infoText=o.successText,t.infoBoxFail=!1,t.infoBoxShow=!0,t.isCanSlide=!1,t.isSuccess=!0,t.timer1&&clearTimeout(t.timer1),t.timer1=setTimeout(()=>{t.isSubmting=!1,Y("success",s,{deviation:s,offsetX:a,pinX:t.pinX-3})},800)):(t.infoText=o.failText,t.infoBoxFail=!0,t.infoBoxShow=!0,t.isCanSlide=!1,Y("fail",s,{deviation:s,offsetX:a,pinX:t.pinX-3}),t.timer1&&clearTimeout(t.timer1),t.timer1=setTimeout(()=>{t.isSubmting=!1,D()},800))},ce=()=>{t.infoBoxFail=!1,t.infoBoxShow=!1,t.isCanSlide=!1,t.isSuccess=!1,t.startWidth=u.value,t.startX=0,t.newX=0},D=a=>{t.isSubmting||(ce(),E(),a&&Y("reset"))};return b({reset:D}),(a,s)=>(le(),me(fe,{to:"body",disabled:t.isInside},[i("div",{class:R(["vue-puzzle-vcode",{inside_:t.isInside,show_:r.show},r.className]),style:M(l(Z)),onMousedown:L,onMouseup:p,onTouchstartPassive:L,onTouchend:p},[i("div",{class:"vue-auth-box_",onMousedown:s[3]||(s[3]=ae(()=>{},["stop"])),onTouchstart:s[4]||(s[4]=ae(()=>{},["stop"]))},[i("div",{class:"auth-body_",style:M(`width:${r.canvasWidth}px;height: ${r.canvasHeight}px`)},[i("canvas",{ref_key:"canvas1",ref:O,class:"auth-canvas1_",width:r.canvasWidth,height:r.canvasHeight},null,8,Ce),i("canvas",{ref_key:"canvas3",ref:B,class:R(["auth-canvas3_",{show:t.isSuccess}]),width:r.canvasWidth,height:r.canvasHeight},null,10,Ie),i("canvas",{ref_key:"canvas2",ref:W,class:"auth-canvas2_",width:l(d),height:r.canvasHeight,style:M(`width:${l(d)}px;height:${r.canvasHeight}px;transform:translateX(${l(m)-l(u)-(l(d)-l(u))*((l(m)-l(u))/(r.canvasWidth-l(u)))}px)`)},null,12,Me),i("div",{class:R(["loading-box_",{hide_:!t.loading}])},ze,2),i("div",{class:R(["info-box_",{show:t.infoBoxShow},{fail:t.infoBoxFail}])},se(t.infoText),3),i("div",{class:R(["flash_",{show:t.isSuccess}]),style:M(`transform: translateX(${t.isSuccess?`${r.canvasWidth+r.canvasHeight*.578}px`:`-${r.canvasHeight*.578}px`}) skew(-30deg, 0);`)},null,6),i("img",{class:"reset_",onClick:s[0]||(s[0]=c=>D(!0)),src:Be})],4),i("div",ke,[i("div",{class:"range-box",style:M(`height:${l(u)}px;width:${r.canvasWidth}px`)},[i("div",He,se(r.sliderText),1),i("div",{class:"range-slider",ref_key:"rangeSlider",ref:V,style:M(`width:${l(m)}px`)},[i("div",{class:R(["range-btn",{isDown:t.mouseDown}]),style:M(`width:${l(u)}px`),onMousedown:s[1]||(s[1]=c=>w(c)),onTouchstart:s[2]||(s[2]=c=>w(c))},De,38)],4)],4)])],32)],38)],8,["disabled"]))}}),re=r=>(Te("data-v-b7e2f3a8"),r=r(),Se(),r),Oe={class:"login_box"},Ee={class:"login_out_box flex-center-x-y"},Fe={class:"login_from"},Ue=re(()=>i("div",{class:"title"},"Hello",-1)),Ve=re(()=>i("div",{class:"title_desc"},"欢迎来到疫情物资管理系统",-1)),Ze=ie({__name:"index",setup(r){let b=ge(),Y=xe(),o=Xe();const O=G({username:[{required:!0,message:"请输入账号",trigger:["blur","change"]},{min:1,max:15,message:"账号长度应为1-15位",trigger:["blur","change"]}],password:[{required:!0,message:"请输入密码",trigger:["blur","change"]},{trigger:["blur","change"],validator:(L,p,w)=>{p.length>=6?w():w(new Error("密码长度至少需6位"))}}]});let W=S(),B=S(!1),t=G({username:"admin",password:"123456"}),m=S(!1),d=S(!1);ne(()=>{Object.keys(b.rememberUser).length!=0&&(t.username=b.rememberUser.username,t.password=b.rememberUser.password,m.value=!0)});const u=()=>{d.value=!1,Q()},Z=async()=>{await W.value.validate(),d.value=!0},Q=async()=>{B.value=!0;try{await b.userLogin(t),m.value?b.addRememberUser(t.username,t.password):b.resetRememberUser(),B.value=!1,o.query.wantToPath?Y.push({path:""+o.query.wantToPath}):Y.push({path:"/home"})}catch{B.value=!1}};return(L,p)=>{const w=A("el-col"),C=A("el-input"),x=A("el-form-item"),E=A("el-checkbox"),n=A("el-button"),N=A("el-form"),z=A("el-row");return le(),we("div",Oe,[h(z,{class:"el_row"},{default:T(()=>[h(w,{xs:0,sm:11}),h(w,{xs:24,sm:12},{default:T(()=>[i("div",Ee,[i("div",Fe,[Ue,Ve,h(N,{model:l(t),"label-width":"0px",rules:O,ref_key:"formRef",ref:W,"status-icon":""},{default:T(()=>[h(x,{label:"",prop:"username"},{default:T(()=>[h(C,{modelValue:l(t).username,"onUpdate:modelValue":p[0]||(p[0]=X=>l(t).username=X),"prefix-icon":l(_e),placeholder:"请输入账号"},null,8,["modelValue","prefix-icon"])]),_:1}),h(x,{label:"",prop:"password"},{default:T(()=>[h(C,{modelValue:l(t).password,"onUpdate:modelValue":p[1]||(p[1]=X=>l(t).password=X),"prefix-icon":l(ye),type:"password",placeholder:"请输入密码","show-password":""},null,8,["modelValue","prefix-icon"])]),_:1}),h(x,null,{default:T(()=>[h(E,{modelValue:l(m),"onUpdate:modelValue":p[2]||(p[2]=X=>oe(m)?m.value=X:m=X),class:"login_check",label:"记住密码"},null,8,["modelValue"])]),_:1}),h(x,null,{default:T(()=>[h(n,{type:"primary",class:"login_btn",loading:l(B),onClick:Z},{default:T(()=>[be("登录")]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"])])])]),_:1}),h(w,{xs:0,sm:1})]),_:1}),h(l(Pe),{show:l(d),onSuccess:u,onClose:p[3]||(p[3]=X=>oe(d)?d.value=!1:d=!1)},null,8,["show"])])}}});const Ne=Ye(Ze,[["__scopeId","data-v-b7e2f3a8"]]);export{Ne as default};
