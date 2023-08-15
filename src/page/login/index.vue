<template>
  <div class="login_box">
    <el-row class="el_row">
      <el-col :xs="0" :sm="10"></el-col>
      <el-col :xs="24" :sm="14">
        <div class="login_out_box  flex-center-x-y">
          <div class="login_from ">
            <div class="title">
              Hello
            </div>
            <div class="title_desc">
              欢迎来到硅谷甄选
            </div>

            <el-form :model="formInfo" label-width="0px" :rules="rules" ref="formRef">
              <el-form-item label="" prop="username">
                <el-input v-model="formInfo.username" :prefix-icon="UserFilled" placeholder="请输入账号" />
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input v-model="formInfo.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                  show-password />
              </el-form-item>
              <el-button type="primary" class="login_btn" :loading="loadingBtn" @click="handleLogin()">登录</el-button>
            </el-form>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";

import  useUserStore from "@/store/modules/user";
import { useRouter,useRoute } from "vue-router";
let userStore=useUserStore();
let $router=useRouter();
let $route=useRoute();



const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度至少需6位'));
  }
}

//@ts-ignore
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    //对于输入长度动态变化，比失焦点体验更好，但是失焦不会校验
    { min: 5, max: 10, message: '账号长度应为5-10位', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { trigger: 'change', validator: validatorPassword }
  ]
})

let formRef = ref();
let loadingBtn = ref(false);
let formInfo = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  await formRef.value.validate(); //失败不会执行后续代码，但是会提示校验

  //通过校验后
  loadingBtn.value = true;

  //无论接口是否返回的失败，都在拦截器提示即可;
  try {
    await userStore.userLogin(formInfo);
  
    loadingBtn.value = false;

    //判断是否需要跳转原路径问题
    if ($route.query.wantToPath) {
      $router.push({path: ''+$route.query.wantToPath})
    }else{
      $router.push({path:'/'})
    }

  } catch (error) {
    loadingBtn.value = false;
  }


}

</script>

<style scoped lang='scss'>
.login_box {
  height: 100%;
  width: 100%;
  background-image: url('@/assets/background.jpg');
  background-size: cover;

  .el_row {
    height: 100%;
  }
}

.login_out_box {
  height: 100%;

  .login_from {
    padding: 3rem 3rem;
    background-color: rgba(255, 255, 255, 0.032);
    border-radius: 1.3rem 1.3rem 0 0;
    line-height: 3.4rem;
    width: 70%;
    color: white;

    .title {
      font-size: 2.5rem;
    }

    .title_desc {
      font-size: large;
    }

    .login_btn {
      width: 100%;
    }

  }


}
</style>  