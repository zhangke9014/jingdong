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
        type="password"
        v-model="password"
      />
    </div>
    <div class="wrapper__login-button" @click="handlelogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { toRefs } from "vue";
import { reactive } from "@vue/reactivity";
import Toast, { useToastEffect } from "../../components/Toast.vue";

// const useLoginEffect = (showToast) => {
//   const router = useRouter();
//   const data = reactive({ username: "", password: "" });
//   const handlelogin = async () => {
//     try {
//       const result = await post("/api/user/login", {
//         username: data.username,
//         password: data.password,
//       });
//       if (result?.errno == 0) {
//         localStorage.isLogin = true;
//         router.push({ name: "Home" });
//       } else {
//         showToast("登陆失败！");
//       }
//     } catch (e) {
//       showToast("请求失败！");
//     }
//   };
//   const { username, password } = toRefs(data);
//   return { username, password, handlelogin };
// };
const URL = "http://192.168.1.178:3000/api/users/login";
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });
  const handlelogin = async () => {
    try {
      const result = await axios.post(URL, {
        user: {
          username: data.username,
          password: data.password,
        },
      });
      if(result.status==200){
        showToast('登陆成功')
        console.log(result.data);
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      }
    } catch (e) {
      for (let i of e.response.data.errors) showToast(i.msg);
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handlelogin };
};

const useRegisterEffect = () => {
  const router = useRouter();
  const handleRegister = () => {
    router.push({ name: "Register" });
  };
  return { handleRegister };
};
export default {
  name: "Login",
  components: { Toast },
  setup() {
    const router = useRouter();
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, handlelogin } = useLoginEffect(showToast);
    const { handleRegister } = useRegisterEffect();
    return {
      username,
      password,
      show,
      handleRegister,
      toastMessage,
      handlelogin,
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
  &__login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
  }
  &__login-link {
    font-size: 0.14rem;
    text-align: center;
    color: #777;
  }
}
</style>
