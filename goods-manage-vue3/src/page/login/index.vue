<template>
  <div class="login_box">
    <el-row class="el_row">
      <el-col :xs="0" :sm="11"></el-col>
      <el-col :xs="24" :sm="12">
        <div class="login_out_box flex-center-x-y">
          <div class="login_from">
            <div class="title">Hello</div>
            <div class="title_desc">欢迎来到防疫物资调度系统</div>

            <el-form
              :model="formInfo"
              label-width="0px"
              :rules="rules"
              ref="formRef"
              status-icon
            >
              <el-form-item label="" prop="username">
                <el-input
                  v-model="formInfo.username"
                  :prefix-icon="UserFilled"
                  placeholder="请输入账号"
                />
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input
                  v-model="formInfo.password"
                  :prefix-icon="Lock"
                  type="password"
                  placeholder="请输入密码"
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="checkRemember"
                  class="login_check"
                  label="记住密码"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="login_btn"
                  :loading="loadingBtn"
                  @click="handleLogin"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="1"></el-col>
    </el-row>

    <!-- 拼图验证 -->
    <Vcode
      :show="showVerify"
      @success="onSuccessVerify"
      @close="showVerify = false"
    />
  </div>
</template>

<script setup lang="ts">
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { loginFrom } from "@/types/api/user";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
import Vcode from "vue3-puzzle-vcode";
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度至少需6位"));
  }
};

//@ts-expect-error
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "请输入账号", trigger: ["blur", "change"] },
    {
      min: 1,
      max: 15,
      message: "账号长度应为1-15位",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: ["blur", "change"] },
    { trigger: ["blur", "change"], validator: validatorPassword },
  ],
});

let formRef = ref();
let loadingBtn = ref(false);
let formInfo = reactive<loginFrom>({
  username: "admin",
  password: "123456",
});
let checkRemember = ref<boolean>(false);
let showVerify = ref<boolean>(false);

onMounted(() => {
  //判断是否有之前记住的密码
  if (Object.keys(userStore.rememberUser).length != 0) {
    //在el输入框直接拿到的都是字符串
    formInfo.username = userStore.rememberUser.username;
    formInfo.password = userStore.rememberUser.password;
    checkRemember.value = true;
  }
});

const onSuccessVerify = () => {
  showVerify.value = false;
  //关闭验证拼图，并请求登录接口
  reqLogin();
};

const handleLogin = async () => {
  await formRef.value.validate(); //失败不会执行后续代码，但是会提示校验
  showVerify.value = true;
};

const reqLogin = async () => {
  //通过表单校验与拼图后
  loadingBtn.value = true;

  //无论接口是否返回的失败，都在拦截器提示即可;
  try {
    await userStore.userLogin(formInfo);

    //登录成功后，如果勾选记住密码，则存储该账号。否则清空存储的账号，若有的话
    if (checkRemember.value) {
      userStore.addRememberUser(formInfo.username, formInfo.password);
    } else {
      userStore.resetRememberUser();
    }

    loadingBtn.value = false;

    //判断是否需要跳转原路径问题
    if ($route.query.wantToPath) {
      $router.push({ path: "" + $route.query.wantToPath });
    } else {
      $router.push({ path: "/home" });
    }
  } catch (error) {
    loadingBtn.value = false;
  }
};
</script>

<style scoped lang="scss">
.login_box {
  height: 100%;
  width: 100%;
  background-image: url("@/assets/images/background.jpg");
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

    .login_check {
      color: white;
    }
  }
}
</style>
