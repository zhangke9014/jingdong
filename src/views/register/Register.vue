<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
    />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
        type="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="确认密码"
        type="password"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleregister">注册</div>
    <div class="wrapper__register-link" @click="handlelogin">
      已有账号去登录
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>
  
  <script>
import { useRouter } from "vue-router";
import { toRefs, reactive } from "vue";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import axios from "axios";
const useregisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "", ensurement: "" });
  // const handleregister = async () => {
  //   try {
  //     const result = await post("/api/user/register", {
  //       username: data.username,
  //       password: data.password,
  //     });
  //     if (result?.errno == 0) {
  //       router.push({ name: "Login" });
  //     } else {
  //       showToast("注册失败！");
  //     }
  //   } catch (e) {
  //     showToast("请求失败！");
  //   }
  // };
  const handleregister = async () => {
    const URL = "http://192.168.1.178:3000/api/users/register";
    if (data?.password !== data?.ensurement) {
      showToast("两次输入的密码不一致,请重新注册");
    }
    try {
      const result = await axios.post(URL, {
        user: {
          username: data.username,
          password: data.password,
        },
      });
      if (result.status === 201) {
        showToast("注册成功");
        console.log(result.data.user);
        router.push({name:'Login'})
      }
    } catch (e) {
      for (let i of e.response.data.errors) showToast(i.msg);
      //console.log(e);
    }
  };
  const { username, password, ensurement } = toRefs(data);
  return { username, password, handleregister, ensurement };
};
export default {
  name: "Register",
  components: { Toast },
  setup() {
    const router = useRouter();
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, ensurement, handleregister } =
      useregisterEffect(showToast);

    const handlelogin = () => {
      router.push({ name: "Login" });
    };
    return {
      handlelogin,
      username,
      password,
      ensurement,
      handleregister,
      show,
      toastMessage,
    };
  },
};
</script>
  
  <style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    background-color: #f9f9f9;
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.2rem;
    &__content {
      line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      &::placeholder {
        font-size: 0.16rem;
        color: #777;
      }
    }
  }
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
  }
  &__register-link {
    font-size: 0.14rem;
    text-align: center;
    color: #777;
  }
}
</style>
  